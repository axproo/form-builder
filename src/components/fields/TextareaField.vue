<template>
    <label :for="field.name" :class="field.ui?.labelClass">{{ field.label }}</label>
    <div :class="field.ui?.wrapperClass">
        <textarea
            :id="field.name"
            :name="field.name"
            :class="field.ui?.inputClass"
            v-bind="field.attributes"
            v-model="textSearch"
            @input="handleText"
        ></textarea>
        <p v-if="error" :class="field.ui?.errorClass">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { BaseFieldProps } from '../../types/form-schema';

const props = defineProps<BaseFieldProps & {
    error?: string | null
}>()
const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'update:error', value: string | null): void
}>()

const textSearch = computed({
    get: () => props.modelValue,
    set: (value: string) => emit('update:modelValue', value)
})

const handleText = (e: Event) => {
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