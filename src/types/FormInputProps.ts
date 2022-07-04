import { CustomValidateFunction } from './formValidation';

export interface FormInputProps<T> {
    name: string;
    value: T;
    onChange: onChangeFunction<T>;
    disabled?: boolean;
    required?: boolean;
    customValidate?: CustomValidateFunction<T>;
}

export type onChangeFunction<T> = (name: string | any, value: T) => void;
