import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";
import {getCookie} from "cookies-next";

export async function getAllProduct() {

    const requestMasterUid = getCookie("requestMasterUid")

    try {

        const res: AxiosResponse = await customRequest.post(`/api/RequestDetail/CreateProduct`, {
            requestMasterUid: requestMasterUid,
        })

        return res.data.data;

    } catch (error) {
        console.error("Error:", error);
    }

    return null
}