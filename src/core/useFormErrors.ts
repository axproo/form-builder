import { reactive } from "vue";

export function useFormErrors() {
    const errors = reactive<Record<string, string>>({})
    const globalError = reactive<{message: string | null}>({message: null})

    const setErrors = (payload: any) => {
        clear()

        if (payload?.errors) {
            Object.assign(errors, payload.errors)
        }

        if (payload?.message) {
            globalError.message = payload.message
        }
    }

    const clear = () => {
        Object.keys(errors).forEach(k => delete errors[k])
        globalError.message = null
    }

    return { errors, globalError, setErrors, clear}
}