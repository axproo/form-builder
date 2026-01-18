import { formConfig } from "../config/form.config";


export async function fetchFormSchema(formId: string) {
    const res = await fetch(`${formConfig.apiBaseUrl}/v1/forms/show/${formId}`, {
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