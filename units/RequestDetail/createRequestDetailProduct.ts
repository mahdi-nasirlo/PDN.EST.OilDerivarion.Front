import {AxiosResponse} from "axios";
import {customRequest} from "../../lib/customRequest";
import {MaterialRequest} from "@/app/dashboard/request/formulacion/components/primary-product-form";

export async function createRequestDetailProduct(data: MaterialRequest, setLoading: any, callback: any = null, errorCallback: any = null) {

    try {

        setLoading(true)

        const res: AxiosResponse = await customRequest.post(`/api/RequestDetail/CreateMaterial`, data)

        setLoading(false)

        if (res.data.success) {
            callback()
        }

        const requestMasterUid = res.data.data;


    } catch (error) {
        setLoading(false)

        errorCallback()

        console.error("Error:", error);
    }

}