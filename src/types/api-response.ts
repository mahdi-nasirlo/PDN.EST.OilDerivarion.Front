import {z} from 'zod';
import {errorMessage} from "../constance/error-message";

interface GeneralResponseType {
    success: boolean,
    message: string,
    data?: any
}

const generalResponseZod = z.object({
    status: z.number(),
    notify: z.boolean().or(z.undefined()),
    success: z.boolean(),
    message: z.string(),
})

const notEmpty = z.string().trim().min(1, {message: errorMessage.required});

export {generalResponseZod, notEmpty}
export type {GeneralResponseType}