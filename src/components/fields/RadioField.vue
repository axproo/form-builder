<template>
    <label :for="field.name" :class="field.ui?.labelClass">{{ field.label }}</label>
    <div :class="field.ui?.wrapperClass">
        <label
            v-for="opt in field.options"
            :key="opt.value"
        >
            <input
                :id="field.name"
                :name="field.name"
                type="radio"
                :checked="modelValue === opt.value"
                :class="field.ui?.inputClass"
                @change="handleChange"
            />
        </label>
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
    (e: 'update:modelValue', value: string): void,
    (e: 'update:error', value: string | null): void
}>()

const handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target) return

    emit('update:modelValue', target.value)
}

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue && props.error) {
        emit('update:error', null)
    }
})
</script>