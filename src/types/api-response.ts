import { type } from "os"

interface GeneralResponseType {
    success: boolean,
    message: string,
    data?: any
}

export type {GeneralResponseType}