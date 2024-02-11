import useRequestPackageInfo from "@/hooks/material/use-request-package-part-info";
import {useRequestPackagePartMaterialAdd} from "@/hooks/material/use-request-package-part-material-add";
import {useValidation} from "@/hooks/use-validation";
import {z} from "zod";

interface TProps {
    partUid: string,
    visibleModal: any,
    setVisibleModal: any
    package_uid?: string
}

const useUiRequestMaterialCreate = ({partUid, package_uid, visibleModal, setVisibleModal}: TProps) => {

    const requestInfo = useRequestPackageInfo(partUid)

    const addMaterial = useRequestPackagePartMaterialAdd(package_uid)

    const [form, rules] = useValidation(addMaterial.type)

    const onClose = () => {

        if (!requestInfo.isFetching && !addMaterial.isPending)
            setVisibleModal(false)

    }

    const onFinish = async (values: z.infer<typeof addMaterial.type>) => {

        const res = await addMaterial.mutateAsync({
            part_UID: partUid,
            darsad_Estefadeh: values.darsad_Estefadeh,
            material_UID: values.material_UID,
            part_Type: requestInfo.data?.Part_Type
        })

        if (res.success) {
            setVisibleModal(false)
            form.resetFields()
        }

    }

    return {requestInfo, addMaterial, form, rules, onFinish, onClose}
};

export default useUiRequestMaterialCreate;