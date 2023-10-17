import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {listFetcher} from "../../lib/server/listFetcher";

interface RequestDetailMaterialType {
    create: {
        isLoading: boolean,
        trigger: (arg: Create, notify?: boolean) => any
    },
    update: {
        isLoading: boolean,
    },
    delete: {
        isLoading: boolean,
        trigger: (arg: { uid: any }) => void
    }
}

interface Create {
    requestMasterUid: string,
    productUid: string,
    densityTypeId: number
}

const useCrudRequestDetailProduct = (): RequestDetailMaterialType => {

    const {
        isMutating: isLDCreateProduct,
        trigger: createProduct
    } = useSWRMutation("/RequestDetail/CreateProduct", listFetcher)

    const {
        isMutating: isLdCreateProductWithNotify,
        trigger: createProductWithNotify
    } = useSWRMutation("/RequestDetail/CreateProduct", mutationFetcher)


    const handleCreate = async (value: Create, notify: boolean = false) => {


        if (notify)
            return await createProduct(value)
        else
            return await createProductWithNotify(value)

    }

    const {
        isMutating: isLdDeleteProduct,
        trigger: deleteProduct
    } = useSWRMutation("/RequestDetail/DeleteProduct", mutationFetcher)


    return {
        create: {
            isLoading: isLDCreateProduct,
            trigger: handleCreate
        },
        update: {
            isLoading: false,
        },
        delete: {
            isLoading: isLdDeleteProduct,
            trigger: deleteProduct
        }
    }

};

export default useCrudRequestDetailProduct;