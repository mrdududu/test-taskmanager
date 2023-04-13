<script setup lang="ts">
import { useTaskManagerStore } from '@/stores/task-manager'
import CollectionGroup from './CollectionGroup.vue'

const store = useTaskManagerStore()
</script>

<template lang="pug">
CollectionGroup(:collection="store.statuses.state" groupLabel="Statuses" newItemPlaceholder="New status" @add="(name) => {store.statuses.addItem({name})}" @delete="store.statuses.delItem")
</template>
