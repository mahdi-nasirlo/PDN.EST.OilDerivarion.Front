import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";
import {getCookie} from "cookies-next";

export async function getAllRequestDetailMaterial() {

    const requestMasterUid = getCookie("requestMasterUid")

    try {

        const res: AxiosResponse = await customRequest.post(`/api/RequestDetail/GetAllMaterial`, {requestMasterUid: requestMasterUid})

        return res.data.data;

    } catch (error) {
        console.error("Error:", error);
    }

    return null
}