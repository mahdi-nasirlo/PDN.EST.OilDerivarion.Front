import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {MaterialRequest} from "@/app/producer/dashboard/request/formulacion/components/primary-product-form";

interface RequestDetailMaterialType {
    create: {
        isLoading: boolean,
        trigger: (arg: MaterialRequest) => any
    },
    update: {
        isLoading: boolean
    },
    getAll: {
        isLoading: boolean
    },
    delete: {
        isLoading: boolean
    }
}

const useCrudRequestDetailMaterial = (): RequestDetailMaterialType => {

    const {
        isMutating: isMutatingCreate,
        trigger: create,
    } = useSWRMutation("/RequestDetail/CreateMaterial", mutationFetcher)


    return {
        create: {
            isLoading: isMutatingCreate,
            trigger: create
        },
        update: {
            isLoading: false
        },
        getAll: {
            isLoading: false
        },
        delete: {
            isLoading: false
        }
    }

};

export default useCrudRequestDetailMaterial;