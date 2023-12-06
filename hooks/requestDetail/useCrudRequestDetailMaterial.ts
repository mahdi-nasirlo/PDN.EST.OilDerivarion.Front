import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {mutate} from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

interface RequestDetailMaterialType {
    create: {
        isLoading: boolean,
        trigger: (arg: any, notify?: true) => any
    },
    update: {
        isLoading: boolean
    },
    getAll: {
        isLoading: boolean
    },
    delete: {
        isLoading: boolean,
        trigger: (arg: { uid: string | undefined }) => any
    }
}

const useCrudRequestDetailMaterial = (): RequestDetailMaterialType => {

    const {
        isMutating: isMutatingCreate,
        trigger: create,
    } = useSWRMutation("/RequestDetail/CreateMaterial", listFetcher)

    const {
        isMutating: isMutatingCreateWithNotify,
        trigger: createWithNotify,
    } = useSWRMutation("/RequestDetail/CreateMaterial", mutationFetcher)

    const {
        isMutating: isMutatingDelete,
        trigger: Delete,
    } = useSWRMutation("/RequestDetail/DeleteMaterial", mutationFetcher)


    const handleCreate = async (value: any, notify: boolean = false) => {

        if (value?.materialImportDeclarationNumber) {
            value.materialImportDeclarationNumber =
                value?.materialImportDeclarationNumber.toString();
        }

        value.materialSupplyIranCode = value.materialSupplyIranCode;
        value.materialSupplyNationalCode =
            value.materialSupplyNationalCode;
        value.materialSupplyPersonTypeId = 1;
        value.materialSupplyMethodId = 1;

        let res

        if (notify)
            res = await createWithNotify(value)
        else
            res = await create(value)

        await mutate("/RequestDetail/GetAllMaterial")

        return res

    }


    return {
        create: {
            isLoading: isMutatingCreate || isMutatingCreateWithNotify,
            trigger: handleCreate
        },
        update: {
            isLoading: false
        },
        getAll: {
            isLoading: false
        },
        delete: {
            isLoading: isMutatingDelete,
            trigger: Delete
        }
    }

};

export default useCrudRequestDetailMaterial;