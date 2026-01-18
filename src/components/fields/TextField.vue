<template>
    <label :for="field.name" :class="field.ui?.labelClass">{{ field.label }}</label>
    <div :class="field.ui?.wrapperClass">
        <input
            :id="field.name"
            :type="currentType"
            :placeholder="field.placeholder"
            :required="Boolean(field.required || false)"
            :autocomplete="field?.autocomplete || 'off'"
            v-model="textSearch"
            v-bind="field?.attributes || {}"
            @input="onInput"
            :class="[field.ui?.inputClass]"
        />
        <p v-if="error" :class="field.ui?.errorClass">{{ error }}</p>
        
        <slot 
            name="append"
            :toggle="toggleAppend"
            :showPassword="showPassword"
        />
        <slot name="prepend" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { BaseFieldProps, FormField } from '../../types/form-schema';

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

const onInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target) return

    emit('update:modelValue', target.value)
}

watch(() => props.modelValue, (newValue, oldValue) => {
    if (newValue !== oldValue && props.error) {
        emit('update:error', null)
    }
})

const showPassword = ref<boolean>(false)
const toggleAppend = () => {
    showPassword.value = !showPassword.value
}

const currentType = computed(() => {
    if (props.field?.type === 'password') {
        return showPassword.value ? 'text' : 'password'
    }
    return props.field.type
})
</script>