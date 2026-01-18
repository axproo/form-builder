<template>
    <label :for="field.name" :class="field.ui?.labelClass">{{ field.label }}</label>
    <div :class="field.ui?.wrapperClass">
        <input
            v-bind="field.attributes || {}"
            type="file"
            :id="field.name"
            :name="field.name"
            @change="handleFile"
        />
        <p v-if="error" :class="field.ui?.errorClass">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { BaseFieldProps } from '../../types/form-schema';

const props = defineProps<BaseFieldProps & {
    error?: string | null
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: File | null): void
    (e: 'update:error', value: string | null): void
}>()

const handleFile = (e: Event) => {
    const input = e.target as HTMLInputElement
    if (!input.files || input.files.length === 0) {
        emit('update:modelValue', null)
        return
    }

    emit('update:modelValue', input.files[0])
    input.value = ''
}

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue && props.error) {
        emit('update:error', null)
    }
})
</script>