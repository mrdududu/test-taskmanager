<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskManagerStore } from '@/stores/task-manager'
import GroupWrapper from './GroupWrapper.vue'
import { ElButton, ElInput, ElDatePicker } from 'element-plus'
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'

const store = useTaskManagerStore()

const groupLabel = 'Dates'
const newItemPlaceholder = 'New date'

const newItem = ref<Date>()

const isoDateToFormatDate = (isoDate: string) => {
  const jsDate = new Date(isoDate)
  return jsDate
    .toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
    .replace(/\//g, '.')
}

const collection = computed(() =>
  store.dates.state.map((item) => ({ id: item.id, name: isoDateToFormatDate(item.isoDateString) }))
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
  store.dates.delItem(id)
}
</script>

<template lang="pug">
GroupWrapper(:label="groupLabel")
  template(#select)
    .flex(v-for="item in collection" :key="item.id")
      div {{ item.name }}
      el-button(:icon="RemoveFilled" circle text @click="handleDel(item.id)")
  template(#add)
    .flex 
      //- el-input(:placeholder="newItemPlaceholder" v-model="newItem" @keydown.enter="handleAdd")
      el-date-picker(:placeholder="newItemPlaceholder" v-model="newItem" @keydown.enter="handleAdd" type="date")
      el-button(:icon="CirclePlusFilled" circle text @click="handleAdd")
</template>
