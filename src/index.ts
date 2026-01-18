import type { App } from "vue";

import DynamicForm from "./components/DynamicForm.vue"
import TextField from "./components/fields/TextField.vue";
import CheckboxField from "./components/fields/CheckboxField.vue";
import FileField from "./components/fields/FileField.vue";
import HiddenField from "./components/fields/HiddenField.vue";
import RadioField from "./components/fields/RadioField.vue";
import SelectField from "./components/fields/SelectField.vue";
import TextareaField from "./components/fields/TextareaField.vue";
import CodeField from "./components/fields/CodeField.vue";

export function install(app: App) {
    app.component('TextField', TextField)
    app.component('CheckboxField', CheckboxField)
    app.component('FileField', FileField)
    app.component('HiddenField', HiddenField)
    app.component('RadioField', RadioField)
    app.component('SelectField', SelectField)
    app.component('TextareaField', TextareaField)
    app.component('CodeField', CodeField)
}

export { DynamicForm, TextField, CheckboxField, FileField, HiddenField, RadioField, SelectField, TextareaField, CodeField }
export * from './types/form-schema';