import { z } from 'zod';

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


export {generalResponseZod}
export type {GeneralResponseType}