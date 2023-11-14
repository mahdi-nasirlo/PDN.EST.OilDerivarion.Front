import React, { useContext, useState } from 'react';
import { Divider, Table, Typography } from "antd";
import useGetPageMaterialRequestDetail
    from "../../../../../../../../hooks/requestDetail/useGetPageMaterialRequestDetail";
import { ColumnsType } from "antd/es/table";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import { addIndexToData } from "../../../../../../../../lib/addIndexToData";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { DataItemType } from "../../../../../../../../hooks/requestDetail/useGetPageProductRequestDetail";
import useCrudRequestDetailMaterial from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";
import { mutate } from "swr";

const MaterialRequestDetailTable = () => {

    const prosecuteController = useContext(StepContext)

    const requestDetailMaterial = useGetPageMaterialRequestDetail(prosecuteController.requestMaster.requestMasterUid)

    const [deleteVisible, setDeleteVisible] = useState(false)
    const [recordeToDelete, setRecordToDelete] = useState<string>()

    const columns: ColumnsType<DataItemType> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            width: "5%"
        },
        {
            title: "عنوان",
            dataIndex: "ProductOrMaterialName"
        },
        {
            title: "درصد استفاده",
            dataIndex: "MaterialUsagePercentage",
            render: value => <>{value}%</>
        },
        {
            title: "عملیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (value, record) => <Typography
                className="text-red-500 cursor-pointer"
                onClick={() => {
                    setDeleteVisible(true);
                    setRecordToDelete(record.Uid)
                }}
            >
                حذف
            </Typography>
        }
    ]

    const crudRequestDetailMaterial = useCrudRequestDetailMaterial()

    const handleDelete = async () => {

        setDeleteVisible(false)

        await crudRequestDetailMaterial.delete.trigger({ uid: recordeToDelete })

        await mutate("/RequestDetail/GetPageMaterial")

    }

    return (
        <>
            <Divider />

            <Table
                className="mt-3"
                columns={columns}
                loading={requestDetailMaterial.isLoading}
                dataSource={addIndexToData(requestDetailMaterial.data?.records)}
            />
            <ConfirmDeleteModal open={deleteVisible} setOpen={setDeleteVisible} handleDelete={handleDelete}
                title={"حذف ماده اولیه"} />
        </>
    );
};

export default MaterialRequestDetailTable;