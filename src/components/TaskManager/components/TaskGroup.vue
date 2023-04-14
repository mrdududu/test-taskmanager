<script setup lang="ts">
import { watch } from 'vue'
import { useTaskManagerStore } from '@/stores/task-manager'
import CollectionGroup from './CollectionGroup.vue'

const store = useTaskManagerStore()

// watch(store.tasks, (nv) => {
//   console.log('Watch store.tasks', nv)
// })

const handleDel = (id: number) => {
  store.events.removeItemsByTaskId(id)
  store.tasks.delItem(id)
}
</script>

<template lang="pug">
CollectionGroup(:collection="store.tasks.state" groupLabel="Tasks" newItemPlaceholder="New task" @add="(name) => {store.tasks.addItem({name})}" @delete="handleDel")
</template>
