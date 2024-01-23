import { z } from 'zod';

interface GeneralResponseType {
    success: boolean,
    message: string,
    data?: any
}

const generalResponseZod = z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.any()
})


export {generalResponseZod}
export type {GeneralResponseType}