import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react'
import useGetAllProductRequestDetail, { DataItemType } from '../../../../../../hooks/requestDetail/useGetAllProductRequestDetail';
import useProductGetCode from '../../../../../../hooks/productCode/useProductGetCode';
import { addIndexToData } from '../../../../../../lib/addIndexToData';
import CodeModal from './code-modal';

export default function DataTable({ uid }: { uid: string }) {

    const [openModal, SetOpenModal] = useState(false);

    const { data, isLoading } = useGetAllProductRequestDetail(uid)

    const { handleTrigger, isMutating } = useProductGetCode()

    const [recordToEdit, setRecordToEdit] = useState<any>(null);

    const [Code, SetCode] = useState<any>(null);

    const tableColumns: ColumnsType<DataItemType> = [
        {
            title: "ردیف",
            key: "1",
            dataIndex: "Row",
            width: "5%",
        },
        {
            title: " نام محصول",
            key: "2",
            dataIndex: "ProductName",
        },
        {
            title: "درصد استحصال",
            key: "3",
            dataIndex: "ProductUsageExploitation",
            render: (value) => <>{value}%</>,
        },
        {
            title: "درصد هدر رفت",
            key: "4",
            dataIndex: "ProductUsageWasted",
            render: (value) => <>{value}%</>,
        },
        {
            title: "عملیات",
            key: "3",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (value, record) => (
                <button
                    className="text-secondary-500 cursor-pointer font-bold"
                    onClick={
                        async () => {
                            const res = await handleTrigger({ requestDetailUId: record.Uid });
                            SetOpenModal(true);
                            setRecordToEdit(record);
                            SetCode(res?.ProductCode);
                        }
                    }
                >
                    دریافت کد رهگیری
                </button>
            ),
        },
    ];

    return (
        <>
            <Table
                dataSource={addIndexToData(data)}
                loading={isLoading || isMutating}
                className="mt-3"
                columns={tableColumns}
                pagination={false}
            />
            <CodeModal
                openModal={openModal}
                SetOpenModal={SetOpenModal}
                recordToEdit={recordToEdit}
                Code={Code}
            />
        </>
    )
}
