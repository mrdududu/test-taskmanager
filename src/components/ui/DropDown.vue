<script setup lang="ts">
import { ElSelect, ElOption } from 'element-plus'

interface DropDownOption {
  key: number | string
  label: string
  value: unknown
}

interface DropDownProps {
  options: DropDownOption[]
  value?: unknown
}

const props = defineProps<DropDownProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: unknown): void
}>()
</script>
<template lang="pug">
el-select(:model-value="value" @update:modelValue="$emit('update:modelValue', $event)")
  el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
</template>
