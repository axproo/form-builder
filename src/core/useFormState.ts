import { reactive } from "vue";

export function useFormState (fields: any[]) {
    const state = reactive<Record<string, any>>({})

    fields.forEach(f => {
        state[f.name] = f.default ?? null
    })

    return state
}