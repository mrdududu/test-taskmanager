<script setup lang="ts">
const props = defineProps<{ label?: string }>()
</script>
<template lang="pug">
div(class="border rounded-sm px-4 mb-4")
  div(v-if="label" class="text-sm font-semibold px-3 py-2") {{ label }}
  div
    slot(name="add")
  div
    slot(name="select")
</template>
