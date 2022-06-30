import { HTTPStatusCode } from '../constants/statusCodes';
import { FieldErrorsObj } from './fieldErrors';

export interface APIError {
    message: string;
    response: APIErrorResponse;
}

interface APIErrorResponse {
    status: HTTPStatusCode; // todo replace with status code
    data: string | { errors: FieldErrorsObj };
}
