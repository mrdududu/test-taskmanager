<script setup lang="ts">
import { ref } from 'vue'
import GroupWrapper from './GroupWrapper.vue'
import { ElButton, ElInput } from 'element-plus'
import { CirclePlusFilled, RemoveFilled } from '@element-plus/icons-vue'

type NameItem = {
  id: number
  name: string
}

type Collection = NameItem[]

interface CollectionGroupProps {
  collection: Collection
  groupLabel?: string
  newItemPlaceholder?: string
}

const props = defineProps<CollectionGroupProps>()

const emit = defineEmits<{
  (e: 'add', name: string): void
  (e: 'delete', id: number): void
}>()

const newItem = ref('')

const handleAdd = () => {
  emit('add', newItem.value)
  newItem.value = ''
}

const handleDel = (id: number) => {
  emit('delete', id)
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
      el-input(:placeholder="newItemPlaceholder" v-model="newItem" @keydown.enter="handleAdd")
      el-button(:icon="CirclePlusFilled" circle text @click="handleAdd")
</template>
