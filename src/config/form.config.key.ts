import { InjectionKey } from "vue";
import { FormConfig } from "./form.config";

export const FormBuilderConfigKey: InjectionKey<FormConfig> = Symbol('FormConfig')