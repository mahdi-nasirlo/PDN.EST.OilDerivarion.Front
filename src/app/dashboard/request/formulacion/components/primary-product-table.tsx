import {Button, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {RequestDetail} from "../../../../../../interfaces/requestDetail";
import {addIndexToData} from "../../../../../../lib/addIndexToData";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
// import {DeleteProductRequestDetail} from "../../../../../../units/RequestDetail/deleteProduct";


export default function PrimaryProductTable({data, loading = false, mute, setData}: {
    data: RequestDetail[],
    loading: any,
    mute: any,
    setData: (arg: any) => void
}) {

    const {isMutating: isDeleting, trigger} = useSWRMutation("/RequestDetail/DeleteMaterial", mutationFetcher)

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const [deleteUid, setDeleteUid] = useState('');

    const columns: ColumnsType<RequestDetail> = [
        {
            title: 'ردیف',
            width: 100,
            dataIndex: 'Row',
            key: 'Row',
        },
        {
            title: 'نام مواد',
            width: 100,
            dataIndex: 'ProductOrMaterialName',
            key: 'ProductOrMaterialName',
        },
        {
            title: 'میزان مصرف برای یک واحد',
            dataIndex: 'MaterialUnitConsumption',
            key: 'MaterialUnitConsumption',
            width: 150,
        },
        {
            title: 'درصد',
            dataIndex: 'MaterialUsagePercentage',
            key: 'MaterialUsagePercentage',
            width: 150,
        },
        {
            title: 'میزان مصرف',
            dataIndex: 'MaterialTotalConsumption',
            key: 'MaterialTotalConsumption',
            width: 150,
        },
        {
            title: "منابع عمده تامین",
            children: [
                {
                    title: "درصد تامین خارجی",
                    dataIndex: "MaterialInternalSupplyPercentage",
                    key: 'MaterialInternalSupplyPercentage',
                    align: "center",
                },
                {
                    title: "درصد تامین داخلی",
                    dataIndex: "MaterialInternalSupplyPercentage",
                    key: 'MaterialInternalSupplyPercentage',
                    align: "center",
                },
            ],
        },
        {
            title: 'جزئیات',
            key: 'operation',
            fixed: 'right',
            width: 150,
            render: (_, record) => <>
                <div className={"flex justify-between"}>
                    <Button onClick={() => {
                        setData(record)
                        window.scrollTo({top: 0, behavior: "smooth"})
                    }} type="link" className={"text-primary-500"}>ویرایش</Button>
                    <Button loading={isDeleting} type="link" onClick={() => {
                        setDeleteUid(record.Uid)
                        setIsDeleteModalVisible(true)
                    }} className={"text-red-500"}>حذف</Button>
                </div>
            </>,
        },
    ];

    const handleDelete = async () => {

        await trigger({
            "uid": deleteUid
        })

        setIsDeleteModalVisible(false)

        await mute()

    }

    return <>
        <Table loading={loading || isDeleting} className={"mt-6"} pagination={false} columns={columns}
               dataSource={addIndexToData(data) || []}
               scroll={{x: 1500, y: 300}}/>
        <ConfirmDeleteModal setOpen={setIsDeleteModalVisible} open={isDeleteModalVisible}
                            handleDelete={handleDelete}/>
    </>
}
