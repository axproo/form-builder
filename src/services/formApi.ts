import { inject } from "vue";
import { FormBuilderConfigKey } from "../config/form.config.key";


export async function fetchFormSchema(formId: string) {
    const config = inject(FormBuilderConfigKey)
    console.log(config)

    if (!config) {
        throw new Error('[FormBuilder] Plugin not installed')
    }

    const res = await fetch(`${config.apiBaseUrl}/forms/show/${formId}`, {
        credentials: 'include'
    })

    if (!res.ok) {
        throw new Error("Form not accessible")
    }
    const response = await res.json()
    return response.data
}

export async function submitForm(
    schema: any,
    payload: Record<string , any>
) {
    return fetch(schema.config.action, {
        method: schema.config.method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}