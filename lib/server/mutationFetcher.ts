import {AxiosResponse} from "axios";
import {customRequest} from "./customRequest";
import {notification} from "antd";
import handleError from "./handleError";


export async function mutationFetcher(url: string, {arg}: { arg: any }) {


    try {

        const res: AxiosResponse = await customRequest.post(url, arg)

        const data: dataType = res.data

        notification.open({
            type: data.success ? "success" : "error",
            message: data?.message ? data.message : res.statusText
        })

        if (!res.data?.data && !data.success) {
            return false
        }

        if (!res.data?.data && data.success) {
            return true
        }

        return res.data?.data

    } catch (error: any) {

        console.error("Error:", error);

        notification.open({
            type: "error",
            message: error.message
        })

        handleError(error)

        return undefined
    }

}


type dataType = { message: string, success: boolean, data: any }