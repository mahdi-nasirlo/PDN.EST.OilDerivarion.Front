import {AxiosResponse} from "axios";
import {customRequest} from "../customRequest";
import {notification} from "antd";


export async function mutationFetcher(url: string, {arg}: { arg: any }) {


    try {

        const res: AxiosResponse = await customRequest.post(url, arg)

        const data: dataType = res.data

        notification.open({
            type: data.success ? "success" : "error",
            message: data?.message ? data.message : res.statusText
        })

        return res.data?.data

    } catch (error) {

        console.error("Error:", error);

        return []
    }

}


type dataType = { message: string, success: boolean, data: any }