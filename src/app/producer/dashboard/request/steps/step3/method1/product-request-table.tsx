import React, {useContext, useState} from 'react';
import useGetPageProductRequestDetail from "../../../../../../../../hooks/requestDetail/useGetPageProductRequestDetail";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import {ColumnsType} from "antd/es/table";
import {Table, Typography} from "antd";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import {mutate} from "swr";

const ProductRequestTable = () => {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<string>();


    const processController = useContext(StepContext)

    const {data, isLoading} = useGetPageProductRequestDetail(processController.requestMaster.requestMasterUid)

    const tableColumns: ColumnsType<any> = [
        {
            title: "ردیف",
            key: "1",
            dataIndex: "Row"
        },
        {
            title: "نام محصول",
            key: "2",
            dataIndex: "ProductOrMaterialName"
        },
        {
            title: "عملیات",
            key: "3",
            render: (value, record) => <Typography onClick={() => {
                setIsDeleteModalVisible(true);
                setRecordToDelete(record.Uid)
            }} className="text-red-500 cursor-pointer">حذف</Typography>
        }
    ]

    const deleteRequest = useCrudRequestDetailProduct()

    const handleDelete = async () => {

        setIsDeleteModalVisible(false)

        await deleteRequest.delete.trigger({uid: recordToDelete})

        await mutate("/RequestDetail/GetPageProduct")

    }

    return (
        <>
            <Table
                dataSource={data?.records || []}
                loading={isLoading}
                className="mt-3"
                columns={tableColumns}
            />
            <ConfirmDeleteModal
                title="حذف آزمایشگاه"
                open={isDeleteModalVisible}
                setOpen={() => setIsDeleteModalVisible(true)}
                handleDelete={handleDelete}
            />
        </>
    );
};


export default ProductRequestTable;