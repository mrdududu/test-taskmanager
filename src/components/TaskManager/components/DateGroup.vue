<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskManagerStore } from '@/stores/task-manager'
import GroupWrapper from './GroupWrapper.vue'
import { ElButton, ElInput, ElDatePicker } from 'element-plus'
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'
import { isoDateToFormatDate } from '@/shared/func'

const store = useTaskManagerStore()

const groupLabel = 'Dates'
const newItemPlaceholder = 'New date'

const newItem = ref<Date>()

const collection = computed(() =>
  store.dates.state
    .map((item) => ({
      id: item.id,
      name: isoDateToFormatDate(item.isoDateString),
      date: new Date(item.isoDateString)
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
)

const handleAdd = () => {
  if (newItem.value) {
    const isoDateString = newItem.value.toISOString()
    // const fromISO = new Date(isoDateString)
    // console.log('handleAdd', { isoDateString, fromISO, newItem: newItem.value })
    store.dates.addItem({ isoDateString })
    newItem.value = undefined
  }
}

const handleDel = (id: number) => {
  store.events.removeItemsByDateId(id)
  store.dates.delItem(id)
}
</script>

<template lang="pug">
GroupWrapper(:label="groupLabel")
  template(#select)
    .flex(v-for="item in collection" :key="item.id" class="justify-between items-center my-1")
      .text-sm.px-3 {{ item.name }}
      el-button(:icon="RemoveFilled" circle text @click="handleDel(item.id)")
  template(#add)
    .flex 
      el-date-picker(:placeholder="newItemPlaceholder" v-model="newItem" @keydown.enter="handleAdd" type="date")
      el-button(:icon="CirclePlusFilled" circle text @click="handleAdd")
</template>
