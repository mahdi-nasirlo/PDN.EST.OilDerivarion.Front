import {useReducer, useState} from "react";
import stepReducer from "@/app/producer/dashboard/request/state-managment/step-reducer";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {RequestMaster, RequestMasterForm} from "@/app/producer/dashboard/request/steps/Step1";
import {MaterialRequest} from "@/app/producer/dashboard/request/formulacion/components/primary-product-form";
import useCrudRequestDetailMaterial from "../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";
import useCrudRequestDetailProduct from "../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";

export interface ControllerProcessType {
    step: number,
    // dispatch: Dispatch<StepAction>,
    isMutating: boolean,
    requestMaster: ProcessRequestMaster,
    getStep2: (arg: RequestMasterForm) => void
    getStep3: (arg: MaterialRequest) => void,
    getStep4: (arg: any) => void
}

interface ProcessRequestMaster {
    requestMasterUid: string,
    productionMethodId: number
}

const useControlProcess = (): ControllerProcessType => {

    const [step, dispatch] = useReducer(stepReducer, 0)

    const {trigger, isMutating} = useSWRMutation("/RequestMaster/Create", mutationFetcher)

    const [requestMaster, setRequestMaster] = useState<ProcessRequestMaster>({} as ProcessRequestMaster)

    const getStep2 = async (values: RequestMasterForm) => {

        let data: RequestMaster = {
            ...values,
            fileName: values.fileName?.file.name,
        };

        // @ts-ignore
        const res = await trigger(data)


        if (res) {

            setRequestMaster({
                requestMasterUid: res,
                productionMethodId: values.productionMethodId
            })

            dispatch({type: "NEXT", stepNumber: 4})

        }
    };


    const requestDetailMaterial = useCrudRequestDetailMaterial()

    const getStep3 = async (value: MaterialRequest) => {

        value.requestMasterUid = requestMaster.requestMasterUid;
        value.materialImportDeclarationNumber =
            value.materialImportDeclarationNumber.toString();
        value.materialSupplyIranCode = value.materialSupplyIranCode.toString();
        value.materialSupplyNationalCode =
            value.materialSupplyNationalCode.toString();
        value.materialSupplyPersonTypeId = 1;
        value.materialSupplyMethodId = 1;

        const res = await requestDetailMaterial.create.trigger(value)

        if (res)
            dispatch({type: "NEXT", stepNumber: 4})

    }

    const requestDetailProduct = useCrudRequestDetailProduct()

    const getStep4 = async (value: any) => {

        value.requestMasterUid = requestMaster.requestMasterUid

        const res = await requestDetailProduct.create.trigger(value)

        if (res)
            dispatch({type: "NEXT", stepNumber: 4})

    }

    return {step, isMutating, requestMaster, getStep2, getStep3, getStep4}

}

export default useControlProcess