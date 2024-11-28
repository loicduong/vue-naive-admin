export const nodeList = [
  {
    text: 'Start',
    type: 'start',
    class: 'node-start',
  },
  {
    text: 'Rectangle',
    type: 'rect',
    class: 'node-rect',
  },
  {
    type: 'user',
    text: 'User',
    class: 'node-user',
  },
  {
    type: 'push',
    text: 'Push',
    class: 'node-push',
  },
  {
    type: 'download',
    text: 'Location',
    class: 'node-download',
  },
  {
    type: 'end',
    text: 'End',
    class: 'node-end',
  },
]

export const BpmnNode = [
  {
    type: 'bpmn:startEvent',
    text: 'Start',
    class: 'bpmn-start',
  },
  {
    type: 'bpmn:endEvent',
    text: 'End',
    class: 'bpmn-end',
  },
  {
    type: 'bpmn:exclusiveGateway',
    text: 'Gateway',
    class: 'bpmn-exclusiveGateway',
  },
  {
    type: 'bpmn:userTask',
    text: 'User',
    class: 'bpmn-user',
  },
]
