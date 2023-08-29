import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";
import {getCookie} from "cookies-next";

export async function getAllProductSelectable(args: [string, boolean]) {

    const requestMasterUid = getCookie("requestMasterUid")

    console.log(requestMasterUid)
    try {

        const res: AxiosResponse = await customRequest.post(`/api/RequestDetail/GetAllProductSelectable`, {
            requestMasterUid: requestMasterUid,
            densityType: args[1]
        })

        return res.data.data;

    } catch (error) {
        console.error("Error:", error);
    }

    return null
}