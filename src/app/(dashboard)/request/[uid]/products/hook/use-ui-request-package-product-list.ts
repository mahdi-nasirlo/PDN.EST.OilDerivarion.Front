import useRequestPackagePartProductList from "@/hooks/material/use-request-package-part-product-list";
import {useState} from "react";
import useRequestPackagePartProductDelete from "@/hooks/material/use-request-package-part-product-delete";

const useUiRequestPackageProductList = (uid: string) => {

    const products = useRequestPackagePartProductList(uid)

    const productDelete = useRequestPackagePartProductDelete()

    const [deleteModal, setDeleteModal] = useState<string | boolean>(false);

    const handleDelete = async () => {

        const res = await productDelete.mutateAsync({
            part_UID: uid,
            product_UID: deleteModal as string
        })

        if (res.success)
            setDeleteModal(false)

    }

    const onClose = () => {

        if (!productDelete.isPending) {
            setDeleteModal(false)
        }

    }

    return {products, deleteModal, setDeleteModal, handleDelete, productDelete, onClose}
};

export default useUiRequestPackageProductList;