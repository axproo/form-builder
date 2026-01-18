<template>
    <div v-if="loading">
        <slot v-if="slots.spinner" name="spinner"/>
        <span v-else>Chargment...</span>
    </div>
    <div v-else-if="error">{{ error }}</div>

    <form v-else @submit.prevent="handleSubmit" :class="formClass">
        <template v-for="field in fields" :key="field.name">
            <div :class="field.ui?.spaceClass">
                <component
                    v-if="isVisible(field)"
                    :is="field.component"
                    v-model="formState[field.name]"
                    :field="field"
                    :error="errorHandler.errors[field.name]"
                    @update:error="onFieldError(field.name, $event)"
                >
                    <!-- Slot dynamique dans le champs -->
                    <template
                        v-for="(slotName, zone) in field.slots"
                        :key="zone"
                        #[zone]="slotProps"
                    >
                        <slot :name="slotName" v-bind="slotProps"/>
                    </template>
                </component>
            </div>
        </template>

        <slot name="errorGlobal" :error="errorHandler.globalError.message">
            <p v-if="errorHandler.globalError.message" class="text-red-600 text-sm">
                {{ errorHandler.globalError.message }}
            </p>
        </slot>

        <slot name="submit">
            <button :class="buttonClass" type="submit">
                <slot name="btnName"/>
            </button>
        </slot>
    </form>
</template>

<script setup lang="ts">
import { computed, ref, Slots, useSlots, watch } from 'vue';
import { useFormSchema } from '../core/useFormSchema';
import { useFormState } from '../core/useFormState';
import { isVisible } from '../core/useVisibility';
import { useFormErrors } from '../core/useFormErrors';
import { FieldUI, FormSchema    } from '../types/form-schema';
import { mergeSchemaUI } from '../core/mergeSchemaUI';

const props = defineProps<{
    formId: string,
    ui?: Record<string, FieldUI>
    formClass?: string,
    buttonClass?: string,
    errors?: ReturnType<typeof useFormErrors>
}>()
const errorHandler = props.errors ?? useFormErrors()
const slots: Slots = useSlots()

const emit = defineEmits<{
    (e: 'submit', data: Record<string, any>): void
}>()
const buttonClass = props.buttonClass ?? ''
const { schema: backendSchema, loading, error } = useFormSchema(props.formId)

const schema = computed<FormSchema | null>(() => {
    if (!backendSchema.value) return null
    return mergeSchemaUI(backendSchema.value, props.ui)
})
const formState = ref<Record<string, any>>({})
const fields = computed(() => schema.value?.fields ?? [])

watch(schema, (s) => {
    if (s) formState.value = useFormState(s.fields)
}, { immediate: true})

const handleSubmit = async (e: Event) => {
    e.preventDefault()
    if (!schema.value || !formState.value) return

    emit('submit', {...formState.value})
}

const onFieldError = (name: string, message: string | null) => {
    if (message) {
        errorHandler.errors[name] = message
    } else {
        delete errorHandler.errors[name]
    }
}
</script>