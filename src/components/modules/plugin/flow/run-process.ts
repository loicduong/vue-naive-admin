import { type Node, useVueFlow } from '@vue-flow/core'

export function useRunProcess({
  graph: dagreGraph,
  cancelOnError = ref(true),
}: { graph: Ref<dagre.graphlib.Graph>, cancelOnError: Ref<boolean> }) {
  const { updateNodeData, getConnectedEdges } = useVueFlow()

  const graph = toRef(() => toValue(dagreGraph))

  const isRunning = ref(false)

  const executedNodes = new Set()

  const runningTasks = new Map()

  const upcomingTasks = new Set<Node['id']>()

  async function runNode(node: Node, isStart = false) {
    if (executedNodes.has(node.id)) {
      return
    }

    upcomingTasks.add(node.id)

    const incomers = getConnectedEdges(node.id).filter(
      connection => connection.target === node.id,
    )

    await Promise.all(
      incomers.map(incomer => until(() => !incomer.data.isAnimating)),
    )

    upcomingTasks.clear()

    if (!isRunning.value) {
      return
    }

    executedNodes.add(node.id)

    updateNodeData(node.id, {
      isRunning: true,
      isFinished: false,
      hasError: false,
      isCancelled: false,
    })

    const delay = Math.floor(Math.random() * 2000) + 1000

    return new Promise<void>((resolve) => {
      const timeout = setTimeout(
        async () => {
          const children = graph.value.successors(node.id)

          const willThrowError = Math.random() < 0.15

          if (!isStart && willThrowError) {
            updateNodeData(node.id, { isRunning: false, hasError: true })

            if (toValue(cancelOnError)) {
              await skipDescendants(node.id)
              runningTasks.delete(node.id)

              resolve()
              return
            }
          }

          updateNodeData(node.id, { isRunning: false, isFinished: true })

          runningTasks.delete(node.id)

          if (children && children.length > 0) {
            await Promise.all(children.map(id => runNode({ id } as unknown as Node)))
          }

          resolve()
        },
        isStart ? 0 : delay,
      )

      runningTasks.set(node.id, timeout)
    })
  }

  async function run(nodes: Node[]) {
    if (isRunning.value) {
      return
    }

    reset(nodes)

    isRunning.value = true

    const startingNodes = nodes.filter(
      node => graph.value.predecessors(node.id)?.length === 0,
    )

    await Promise.all(startingNodes.map(node => runNode(node, true)))

    clear()
  }

  function reset(nodes: Node[]) {
    clear()

    for (const node of nodes) {
      updateNodeData(node.id, {
        isRunning: false,
        isFinished: false,
        hasError: false,
        isSkipped: false,
        isCancelled: false,
      })
    }
  }

  async function skipDescendants(nodeId: Node['id']) {
    const children = graph.value.successors(nodeId)

    for (const child of children!) {
      updateNodeData(child.toString(), { isRunning: false, isSkipped: true })
      await skipDescendants(child.toString())
    }
  }

  async function stop() {
    isRunning.value = false

    for (const nodeId of upcomingTasks) {
      clearTimeout(runningTasks.get(nodeId))
      runningTasks.delete(nodeId)
      updateNodeData(nodeId, {
        isRunning: false,
        isFinished: false,
        hasError: false,
        isSkipped: false,
        isCancelled: true,
      })
      await skipDescendants(nodeId)
    }

    for (const [nodeId, task] of runningTasks) {
      clearTimeout(task)
      runningTasks.delete(nodeId)
      updateNodeData(nodeId, {
        isRunning: false,
        isFinished: false,
        hasError: false,
        isSkipped: false,
        isCancelled: true,
      })
      await skipDescendants(nodeId)
    }

    executedNodes.clear()
    upcomingTasks.clear()
  }

  function clear() {
    isRunning.value = false
    executedNodes.clear()
    runningTasks.clear()
  }

  return { run, stop, reset, isRunning }
}

async function until(condition: () => boolean) {
  return new Promise<void>((resolve) => {
    const interval = setInterval(() => {
      if (condition()) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })
}
