import {AxiosResponse} from "axios";
import {customRequest} from "../customRequest";


export async function listFetcher(url: string, {arg}: { arg: any } = {arg: undefined}) {


    try {

        const res: AxiosResponse = await customRequest.post(url, arg)

        return res.data?.data

    } catch (error) {

        console.error("Error:", error);

        return []
    }

}