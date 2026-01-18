<template>
    <input type="hidden" :id="field.name" :name="field.name" :value="modelValue">
</template>

<script setup lang="ts">
import { BaseFieldProps } from '../../types/form-schema';

const props = defineProps<BaseFieldProps>()
</script>