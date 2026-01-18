<template>
    <div :class="field.ui?.wrapperClass">
        <label :for="field.name" :class="field.ui?.labelClass">
            <input 
                v-bind="field.attributes || {}"
                type="checkbox" 
                :class="field.ui?.inputClass"
                :id="String(field.name)"
                :name="String(field.name)"
                :checked="modelValue"
                @change="handleChange"
            />
            <slot name="label" />
        </label>
        <slot name="action"/>
    </div>
</template>

<script setup lang="ts">
import { BaseFieldProps } from '../../types/form-schema';

const props = defineProps<BaseFieldProps>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', target.checked)
}
</script>