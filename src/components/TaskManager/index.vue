<script setup lang="ts">
import { useTaskManagerStore } from '@/stores/task-manager'
import FormConstructor from './components/FormConstructor.vue'
import EventsTable from './components/EventsTable.vue'

const store = useTaskManagerStore()

// store.actions.loadState()
</script>
<template lang="pug">
div
  div Task manager 
  .flex
    div
      FormConstructor
    div
      EventsTable
</template>
