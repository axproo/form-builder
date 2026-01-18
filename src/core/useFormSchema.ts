import { ref } from "vue";
import { fetchFormSchema } from "../services/formApi";

export function useFormSchema (formId: string) {
    const schema = ref<any>(null)
    const loading = ref<boolean>(true)
    const error = ref<string | null>(null)

    async function load() {
        try {
            schema.value = await fetchFormSchema(formId)
        } catch (e: any) {
            error.value = e.message
        } finally {
            loading.value = false
        }
    }

    load()
    return { schema, loading, error}
}