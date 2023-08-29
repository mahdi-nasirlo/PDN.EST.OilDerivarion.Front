import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";

export async function getAllMaterial() {

    try {

        const res: AxiosResponse = await customRequest.post(`/api/Material/GetAll`, {name: null, is_active: true})

        return res.data.data;

    } catch (error) {
        console.error("Error:", error);
    }

    return null
}