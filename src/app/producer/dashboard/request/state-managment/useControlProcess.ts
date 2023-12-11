import {Dispatch, useReducer, useState} from "react";
import stepReducer, {StepAction} from "@/app/producer/dashboard/request/state-managment/step-reducer";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {RequestMaster, RequestMasterForm} from "@/app/producer/dashboard/request/steps/step1";
import useRequestDetailCompleteMaterial from "../../../../../../hooks/requestDetail/useRequestDetailCompleteMaterial";
import useRequestDetailCompleteProduct from "../../../../../../hooks/requestDetail/useRequestDetailCompleteProduct";
import useRequestMasterNextStep from "../../../../../../hooks/requestMaster/useRequestMasterNextStep";

export interface ControllerProcessType {
    step: number,
    dispatch: Dispatch<StepAction>,
    isMutating: boolean,
    requestMaster: ProcessRequestMaster,
    getStep2: (arg: RequestMasterForm) => void
    getStep3: () => void,
    getStep4: () => void,
    getNextStep: () => void,
    getLastStep: () => void
}

interface ProcessRequestMaster {
    requestMasterUid: string,
    productionMethodId: number
}

const stepNumber = 4

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

            dispatch({type: "NEXT", stepNumber})

        }
    };


    const confirmStep2 = useRequestDetailCompleteMaterial()

    const getStep3 = async () => {

        const res = await confirmStep2.trigger({requestMasterUid: requestMaster.requestMasterUid})

        if (res) {

            dispatch({type: "NEXT", stepNumber})

        }

    }


    const confirmStep3 = useRequestDetailCompleteProduct()

    const getStep4 = async () => {

        const res = await confirmStep3.trigger({requestMasterUid: requestMaster.requestMasterUid})

        if (res)
            dispatch({type: "NEXT", stepNumber})

    }

    const requestNextStep = useRequestMasterNextStep()

    const getNextStep = async () => {

        const res = await requestNextStep.trigger({uid: requestMaster.requestMasterUid})
        
        if (res) {
            console.log(res)
            dispatch({type: "GET_STEP", stepNumber, step: 1})
        }

    }

    const getLastStep = () => {

        dispatch({type: "GET_STEP", stepNumber, step: stepNumber})

    }

    return {
        step,
        isMutating: isMutating || confirmStep2.isMutating || confirmStep3.isMutating || requestNextStep.isMutating,
        requestMaster,
        dispatch,
        getStep2,
        getStep3,
        getStep4,
        getNextStep,
        getLastStep
    }

}

export default useControlProcess