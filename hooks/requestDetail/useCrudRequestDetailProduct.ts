import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

interface RequestDetailMaterialType {
    create: {
        isLoading: boolean,
        trigger: (arg: Create) => any
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

interface Create {
    requestMasterUid: string,
    productUid: string,
    densityTypeId: number
}

const useCrudRequestDetailMaterial = (): RequestDetailMaterialType => {

    const {
        isMutating: isLDCreateProduct,
        trigger: createProduct
    } = useSWRMutation("/RequestDetail/CreateProduct", mutationFetcher)

    return {
        create: {
            isLoading: isLDCreateProduct,
            trigger: createProduct
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