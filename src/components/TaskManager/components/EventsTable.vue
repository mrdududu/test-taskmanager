<script setup lang="ts">
import { computed } from 'vue'
import { useTaskManagerStore } from '@/stores/task-manager'
import { isoDateToFormatDate } from '@/shared/func'
import DropDown from '@/components/ui/DropDown.vue'

const store = useTaskManagerStore()

const dates = computed(() =>
  store.dates.state
    .map((item) => ({
      id: item.id,
      name: isoDateToFormatDate(item.isoDateString),
      date: new Date(item.isoDateString)
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
)
// store.statuses.state

const statusesOptions = computed(() =>
  store.statuses.state.map((item) => ({ key: item.id, label: item.name, value: item.id }))
)

const handleStatusSelected = (taskId: number, dateId: number, statusId: number) => {
  // console.log('handleStatusSelected', { taskId, dateId, statusId })
  store.events.addItem(taskId, dateId, statusId)
}

const getStatus = (taskid: number, dateId: number) => {
  return store.events.state[taskid]?.[dateId]
}

const handleStatusClear = (taskId: number, dateId: number) => {
  // console.log('handleStatusClear', taskId, dateId)
  store.events.delItem(taskId, dateId)
}
</script>
<template lang="pug">
div
  table
    thead
      tr
        th Dates #[br] Tasks
        th(v-for="date in dates" :key="date.id") {{ date.name }}
    tbody
      tr(v-for="task in store.tasks.state" :key="task.id")
        td {{ task.name }}
        td(v-for="date in dates" :key="date.id")
          DropDown(:options="statusesOptions" clearable @clear="(event) => { handleStatusClear(task.id, date.id) }" :model-value="getStatus(task.id, date.id)" @update:modelValue="(statusId) => { handleStatusSelected(task.id, date.id, statusId) }")
</template>
