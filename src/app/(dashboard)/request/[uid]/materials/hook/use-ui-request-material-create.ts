import useRequestPackageInfo from "@/hooks/material/use-request-package-part-info";
import {useRequestPackagePartMaterialAdd} from "@/hooks/material/use-request-package-part-material-add";
import {useValidation} from "@/hooks/use-validation";
import {z} from "zod";

interface TProps {
    uid: string,
    visibleModal: any,
    setVisibleModal: any
}

const useUiRequestMaterialCreate = ({uid, visibleModal, setVisibleModal}: TProps) => {

    const requestInfo = useRequestPackageInfo(uid)

    const addMaterial = useRequestPackagePartMaterialAdd()

    const [form, rules] = useValidation(addMaterial.type)

    const onClose = () => {

        if (!requestInfo.isFetching && !addMaterial.isPending)
            setVisibleModal(false)

    }

    const onFinish = async (values: z.infer<typeof addMaterial.type>) => {

        const res = await addMaterial.mutateAsync({
            part_UID: uid,
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