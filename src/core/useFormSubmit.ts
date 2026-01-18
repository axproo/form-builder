import { submitForm } from "../services/formApi";

export async function useFormSubmit(
    schema: any,
    state: any,
    errorHandler: any
) {
    try {
        const res = await submitForm(schema, state)

        if (!res.ok) {
            const payload = await res.json()
            errorHandler.setErrors(payload)
            return false
        }

        errorHandler.clear()
        return await res.json()
    } catch (e) {
        errorHandler.setErrors({
            messsage: 'Erreur réseau'
        })
        return false
    }
}