<script setup lang="ts">
const props = defineProps<{ label?: string }>()
</script>
<template lang="pug">
div
  div(v-if="label") {{ label }}
  div
    slot(name="select")
  div
    slot(name="add")
</template>
