import useRequestPackagePartMaterialList from "@/hooks/material/use-request-package-part-material-list";
import useRequestPackagePartMaterialDelete from "@/hooks/material/use-request-package-part-material-delete";
import {useState} from "react";

interface TProps {
    uid: string,
    package_uid?: string
}

const useUiRequestMaterialCreate = ({uid, package_uid}: TProps) => {

    const materials = useRequestPackagePartMaterialList(uid, package_uid)

    const deleteMaterial = useRequestPackagePartMaterialDelete()

    const [editModal, setEditModal] = useState(false);

    const [deleteModal, setDeleteModal] = useState<string | boolean>(false);

    const onDelete = async () => {
        const res = await deleteMaterial.mutateAsync({
            package_UID: package_uid,
            material_UID: deleteModal as string,
            part_UID: uid,
        })
        if (res.success)
            setDeleteModal(false)
    }

    return {materials, deleteMaterial, editModal, setEditModal, deleteModal, setDeleteModal, onDelete}
};

export default useUiRequestMaterialCreate;