import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react'
import useSWR from "swr";
import { GetPage_ExeManager } from "../../../../../../interfaces/producer";
import { listFetcher } from "../../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../../lib/addIndexToData";
import { getCookie } from "cookies-next";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../lib/server/mutationFetcher";
import { Product } from "../../../../../../interfaces/requestDetail";


export default function ReviewDataTable() {

    const [open, setOpen] = useState(false);

    const [deleteUid, setDeleteUid] = useState("")

    const {
        mutate,
        data,
        isLoading,
    } = useSWR<GetPage_ExeManager>("/RequestDetail/GetPageProduct", (url) => listFetcher(url, {
        arg: {
            "requestMasterUid": getCookie("requestMasterUid"),
            "fromRecord": 0,
            "selectRecord": 110
        }
    }))

    const { isMutating: isDeleting, trigger } = useSWRMutation("/RequestDetail/DeleteProduct", mutationFetcher)

    const columns: ColumnsType<Product & { Row: number }> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "ProductOrMaterialName",
            key: "2",
        },
        {
            title: "دانسیته",
            dataIndex: "ProductDensityTypeId",
            key: "3",
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
                <Button onClick={() => {
                    setOpen(true)
                    setDeleteUid(record.Uid)
                }} danger type="text">
                    حذف
                </Button>
            ),
        },
    ];

    const handleDelete = async () => {
        await trigger({
            "uid": deleteUid
        })

        setOpen(false)

        await mutate()
    }

    return (
        <>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={addIndexToData(data?.records)}
                pagination={false}
            />
            <ConfirmDeleteModal setOpen={setOpen} open={open} handleDelete={handleDelete} />
        </>
    )
}