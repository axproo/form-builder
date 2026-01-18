export interface FormConfig {
    apiBaseUrl: string,
    enableMock: boolean
}

export const formConfig: FormConfig = {
    apiBaseUrl: 'http://localhost:8080/api',
    enableMock: false
}