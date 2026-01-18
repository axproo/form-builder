import { FieldUI, FormSchema } from "../types/form-schema";

export function mergeSchemaUI(
    schema: FormSchema,
    ui?: Record<string, FieldUI>
): FormSchema {
    return {
        ...schema,
        fields: schema.fields.map(field => ({
            ...field,
            ui: ui?.[field.name] ?? field.ui
        }))
    }
}