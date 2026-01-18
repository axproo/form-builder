import type { App } from "vue";

import DynamicForm from "../components/DynamicForm.vue";
import TextField from "../components/fields/TextField.vue";
import CheckboxField from "../components/fields/CheckboxField.vue";
import FileField from "../components/fields/FileField.vue";
import HiddenField from "../components/fields/HiddenField.vue";
import RadioField from "../components/fields/RadioField.vue";
import SelectField from "../components/fields/SelectField.vue";
import TextareaField from "../components/fields/TextareaField.vue";
import CodeField from "../components/fields/CodeField.vue";
import MultipleFileField from "../components/fields/MultipleFileField.vue";

import type { FormConfig } from "../config/form.config";
import { FormBuilderConfigKey } from "../config/form.config.key";

export const FormBuilderPlugin = {
    install(app: App, config: FormConfig) {
        if (!config.apiBaseUrl) {
            throw new Error('[FormConfig] apiBaseUrl is required');
        }

        // Normalisation de la config
        const normalizedConfig: FormConfig = {
            apiBaseUrl: config.apiBaseUrl,
            enableMock: config.enableMock ?? false
        }

        // Provide config
        app.provide(FormBuilderConfigKey, normalizedConfig)

        // Global components
        app.component('DynamicForm', DynamicForm)
        app.component('TextField', TextField)
        app.component('CheckboxField', CheckboxField)
        app.component('FileField', FileField)
        app.component('HiddenField', HiddenField)
        app.component('RadioField', RadioField)
        app.component('SelectField', SelectField)
        app.component('TextareaField', TextareaField)
        app.component('CodeField', CodeField)
        app.component('MultipleFileField', MultipleFileField)
    }
}