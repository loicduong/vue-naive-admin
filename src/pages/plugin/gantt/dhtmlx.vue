<script setup lang="tsx">
import type { GanttConfigOptions, ZoomLevel } from 'dhtmlx-gantt'
import { gantt } from 'dhtmlx-gantt'
import { ganttTasks } from '@/components/modules/plugin/gantt/dhtmlx/data'
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'

definePage({
  meta: {
    icon: 'ant-design:bar-chart-outlined',
  },
})

const ganttRef = shallowRef<HTMLElement>()

type TimeType = 'day' | 'week' | 'month' | 'quarter' | 'year'

const timeType = shallowRef<TimeType>('quarter')

interface TimeData {
  name: string
  code: TimeType
}

const data: TimeData[] = [
  {
    name: 'Day',
    code: 'day',
  },
  {
    name: 'Week',
    code: 'week',
  },
  {
    name: 'Month',
    code: 'month',
  },
  {
    name: 'Quarter',
    code: 'quarter',
  },
  {
    name: 'Year',
    code: 'year',
  },
]

function initGantt() {
  if (!ganttRef.value)
    return

  const config: Partial<GanttConfigOptions> = {
    grid_width: 350,
    add_column: false,
    autofit: false,
    row_height: 60,
    bar_height: 34,
    auto_types: true,
    xml_date: '%Y-%m-%d',
    columns: [
      {
        name: 'text',
        label: 'Project name',
        tree: true,
        width: '*',
      },
      {
        name: 'start_date',
        label: 'Start date',
        align: 'center',
        width: 150,
      },
    ],
  }

  Object.assign(gantt.config, config)

  gantt.init(ganttRef.value)
  gantt.parse({ data: ganttTasks })

  const zoomLevels: ZoomLevel[] = [
    {
      name: 'day',
      scale_height: 60,
      scales: [{ unit: 'day', step: 1, format: '%d %M' }],
    },
    {
      name: 'week',
      scale_height: 60,
      scales: [
        {
          unit: 'week',
          step: 1,
          format(date: Date) {
            const dateToStr = gantt.date.date_to_str('%m-%d')
            const endDate = gantt.date.add(date, -6, 'day') // which week
            return `${dateToStr(endDate)} to ${dateToStr(date)}`
          },
        },
        {
          unit: 'day',
          step: 1,
          format: '%d',
          css(date: Date) {
            if (date.getDay() === 0 || date.getDay() === 6) {
              return 'day-item weekend weekend-border-bottom'
            }
            return 'day-item'
          },
        },
      ],
    },
    {
      name: 'month',
      scale_height: 60,
      min_column_width: 18,
      scales: [
        { unit: 'month', format: '%Y-%m' },
        {
          unit: 'day',
          step: 1,
          format: '%d',
          css(date: Date) {
            if (date.getDay() === 0 || date.getDay() === 6) {
              return 'day-item weekend weekend-border-bottom'
            }
            return 'day-item'
          },
        },
      ],
    },
    {
      name: 'quarter',
      height: 60,
      min_column_width: 110,
      scales: [
        {
          unit: 'quarter',
          step: 1,
          format(date: Date) {
            const yearStr = `${new Date(date).getFullYear()}`
            const dateToStr = gantt.date.date_to_str('%M')
            const endDate = gantt.date.add(gantt.date.add(date, 3, 'month'), -1, 'day')
            return `${yearStr + dateToStr(date)} - ${dateToStr(endDate)}`
          },
        },
        {
          unit: 'week',
          step: 1,
          format(date: Date) {
            const dateToStr = gantt.date.date_to_str('%m-%d')
            const endDate = gantt.date.add(date, 6, 'day')
            return `${dateToStr(date)} to ${dateToStr(endDate)}`
          },
        },
      ],
    },
    {
      name: 'year',
      scale_height: 50,
      min_column_width: 150,
      scales: [
        { unit: 'year', step: 1, format: '%Y' },
        { unit: 'month', format: '%Y-%m' },
      ],
    },
  ]

  gantt.ext.zoom.init({
    levels: zoomLevels,
  })
  gantt.ext.zoom.setLevel(timeType.value)
}

function changeTime(value: TimeType) {
  timeType.value = value
  gantt.ext.zoom.setLevel(value)
}

onMounted(() => {
  initGantt()
})
</script>

<template>
  <div class="overflow-hidden lt-sm:overflow-auto">
    <NCard
      title="Gantt chart demo"
      :bordered="false"
      size="small"
      content-class="overflow-y-hidden overflow-x-auto"
      class="h-full card-wrapper"
    >
      <template #header-extra>
        <NTabs
          :value="timeType"
          type="segment"
          animated
          size="small"
          class="relative w-320px"
          @update:value="changeTime"
        >
          <NTab v-for="item in data" :key="item.code" :name="item.code">
            {{ item.name }}
          </NTab>
        </NTabs>
      </template>

      <div ref="ganttRef" class="size-full min-w-800px" />
    </NCard>
  </div>
</template>

<style scoped lang="scss"></style>
