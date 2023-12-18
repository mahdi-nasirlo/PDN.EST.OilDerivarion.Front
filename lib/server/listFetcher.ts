import {AxiosResponse} from "axios";
import handleError from "./handleError";
import {customRequest} from "../customRequest";
// import reportLog from "../logger/reportLog";
import getTokenFromSession from "./getToken";
import createLog from "../logger/createLog";
import {reportLogEnum} from "../logger/reportLogEnum";


export async function listFetcher(url: string, {arg}: { arg: any } = {arg: undefined}) {

    const token = await getTokenFromSession() || ""

    try {

        const res: AxiosResponse = await customRequest.post(url, arg, {
            headers: {
                "Authorization": token
            }
        })

        const data: dataType = res.data

        const logData = {
            status: res.status,
            token: token,
            url: res?.request?.responseURL,
            data: {
                success: data?.success,
                message: data?.message
            },
        }

        if (!res.data?.data && !data.success) {

            await createLog(reportLogEnum.api_unsuccessful, logData)

            return false
        }

        if (!res.data?.data && data.success) {

            await createLog(reportLogEnum.api_successful, logData)

            return true
        }

        await createLog(reportLogEnum.api_successful, logData)

        return res.data?.data

    } catch (error: any) {

        await handleError(error)

        return []
    }

}


export type dataType = { message: string, success: boolean, data: any }