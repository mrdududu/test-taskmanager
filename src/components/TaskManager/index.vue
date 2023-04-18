<script setup lang="ts">
import { useTaskManagerStore } from '@/stores/task-manager'
import FormConstructor from './components/FormConstructor.vue'
import EventsTable from './components/EventsTable.vue'

const store = useTaskManagerStore()

// store.actions.loadState()
</script>
<template lang="pug">
.grid(class="grid-cols-4 gap-4 h-full")
  div
    FormConstructor
  .col-span-3
    EventsTable
</template>
