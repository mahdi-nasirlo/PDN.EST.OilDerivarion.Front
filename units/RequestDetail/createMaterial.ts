import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";
import {MaterialRequest} from "@/app/dashboard/request/formulacion/components/primary-product-form";

export async function createMaterial(data: MaterialRequest, setLoading: any, callback: any = null) {

    try {

        setLoading(true)

        const res: AxiosResponse = await customRequest.post(`/api/RequestDetail/CreateMaterial`, data)

        setLoading(false)

        const requestMasterUid = res.data.data;

        if (res.data.success) {
            callback()
        }

    } catch (error) {
        setLoading(false)
        console.error("Error:", error);
    }

}