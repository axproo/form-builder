<template>
    <label :for="field.name" :class="field.ui?.labelClass">{{ field.label }}</label>
    <div :class="field.ui?.wrapperClass">
        <input 
            v-bind="field.attributes || {}"
            type="text"
            :id="field.name"
            :name="field.name"
            :placeholder="field.placeholder"
            :required="Boolean(field.required || false)"
            :autocomplete="field.autocomplete || 'off'"
            v-model="textSearch"
            @input="onInput"
        />
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
    (e: 'update:modelValue', value: string): void,
    (e: 'update:error', value: string | null): void
}>()

const textSearch = computed({
    get: () => String(props.modelValue ?? ''),
    set: (value: string) => emit('update:modelValue', value)
})

const onInput = (e: Event) => {
    const attrs = props.field.attributes
    let value = textSearch.value

    if (attrs?.inputMode === 'numeric') {
        value = value.replace(/\D/g, '')

        if (attrs.maxLength) {
            value = value.slice(0, Number(attrs.maxLength))
        }

        emit('update:modelValue', value)
    }
}

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue && props.error) {
        emit('update:error', null)
    }
})
</script>