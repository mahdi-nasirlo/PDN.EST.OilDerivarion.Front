import useRequestPackagePartProductAdd from "@/hooks/material/use-request-package-part-product-add";
import {z} from "zod";
import {useValidation} from "@/hooks/use-validation";
import useRequestPackagePartInfo from "@/hooks/material/use-request-package-part-info";

interface TProps {
    uid: string,
    visibleModal: any,
    setVisibleModal: any
    package_uid?: string
}

const useUiRequestPackageProductCreate = ({uid, visibleModal, setVisibleModal, package_uid}: TProps) => {

    const requestInfo = useRequestPackagePartInfo(uid)

    const addProduct = useRequestPackagePartProductAdd(uid, package_uid)

    const [form, rules] = useValidation(addProduct.type)

    const onClose = () => {

        if (!requestInfo.isFetching && !addProduct.isPending)
            setVisibleModal(false)

    }

    const onFinish = async (values: z.infer<typeof addProduct.type>) => {

        const res = await addProduct.mutateAsync({
            ...values,
            part_UID: uid,
            part_Type: requestInfo.data?.Part_Type as number,
        })

        if (res.success) {
            setVisibleModal(false)
            form.resetFields()
        }

    }

    return {addProduct, requestInfo, onFinish, onClose, form, rules}
};

export default useUiRequestPackageProductCreate;