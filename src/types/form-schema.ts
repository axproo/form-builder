export interface FormSchema {
    id: string,
    version: number,
    permissions?: Record<string, any>,
    fields: FormField[],
}

export interface FieldUI {
    spaceClass?: string,
    wrapperClass?: string,
    inputClass?: string,
    labelClass?: string,
    helpClass?: string,
    errorClass?: string
}

export interface FieldType {
    text?: string,
    email?: string,
    password?: string,
    number?: string
}

export interface FormField {
    name: string,
    component: string,
    type: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    rules?: string[],
    default?: any,
    options?: Array<{ label: string; value: any}>,
    visible?: boolean,
    url?: Record<string, any>,
    slots?: Record<string, string | string[]>,
    ui?: FieldUI,
    attributes?: Record<string, any>,
    autocomplete?: string,
}

export interface BaseFieldProps {
    modelValue: any,
    field: FormField
}

export type FieldUIMap = Record<string, FieldUI>