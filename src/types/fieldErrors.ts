export interface FieldErrorsObj {
    [key: string]: string;
}

export type FieldError = {
    name: string;
    value: string;
};
