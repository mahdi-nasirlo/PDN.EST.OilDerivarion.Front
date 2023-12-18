import {AxiosResponse} from "axios";
import handleError from "./handleError";
import {customRequest} from "../customRequest";
// import reportLog from "../logger/reportLog";
import getTokenFromSession from "./getToken";


export async function listFetcher(url: string, {arg}: { arg: any } = {arg: undefined}) {

    const token = await getTokenFromSession() || ""

    // console.log(token)

    try {

        const res: AxiosResponse = await customRequest.post(url, arg, {
            headers: {
                "Authorization": token
            }
        })

        const data: dataType = res.data

        if (!res.data?.data && !data.success) {

            // const report = reportLog({
            //     type: reportLogEnum.api_unsuccessful,
            //     status: res.status,
            //     data: data,
            // })

            return false
        }

        if (!res.data?.data && data.success) {

            return true
        }

        return res.data?.data

    } catch (error: any) {

        handleError(error)

        return []
    }

}


export type dataType = { message: string, success: boolean, data: any }