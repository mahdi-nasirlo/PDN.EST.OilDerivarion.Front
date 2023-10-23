import {AxiosResponse} from "axios";
import {customRequest} from "../customRequest";


export async function listFetcher(url: string, {arg}: { arg: any } = {arg: undefined}) {


    try {

        const res: AxiosResponse = await customRequest.post(url, arg)

        const data: dataType = res.data

        if (!res.data?.data && !data.success) {
            return false
        }

        if (!res.data?.data && data.success) {
            return true
        }

        return res.data?.data

    } catch (error) {

        console.error("Error:", error);

        return []
    }

}

type dataType = { message: string, success: boolean, data: any }