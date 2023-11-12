"use server"

import {env} from "../env";
import moment from "jalali-moment";
import elasticClient from "./elasticClient";

const reportLog = async (error: any, type: string | null = null) => {

    const date = moment().locale("fa").format("YYYY/M/D *** H:m:s")

    const data = {
        ...error,
        time: date,
        app_env: env.NODE_ENV
    }

    try {

        const request = await elasticClient.index({
            index: "oil-front",
            id: "oil-front-log_" + date,
            document: data,
        })

        console.log(request)

        return request

    } catch (e: any) {

        const data = env.NODE_ENV === "production" ? {
            success: false,
            message: e?.meta?.body?.error?.type,
            statusCode: e?.meta?.statusCode
        } : e

        return data
    }

};

export default reportLog;