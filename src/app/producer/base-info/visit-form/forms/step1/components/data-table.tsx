import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import EditModal from "./edit-modal";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import CustomeTable from "../../../../../../../../components/CustomeTable";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../../../../lib/server/mutationFetcher";


export default function DataTable({
    data,
    mutate,
    isLoading,
    isValidating,
}: {
    data: { records: any[], count: number } | undefined;
    mutate: () => void;
    isLoading: boolean;
    isValidating: any;
}) {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<any | null>(null);

    const handleDelete = (record: any) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    const { trigger: Delete, isMutating: ldDelete } =
        useSWRMutation("/ProducerMixTank/Delete", mutationFetcher);

    const handleConfirmDelete = async () => {

        const res = await Delete({
            uid: recordToDelete?.Uid,
        });

        await mutate();
        if (res) {
            setIsDeleteModalVisible(false);

            setRecordToDelete(null);
        }
    };

    //ادیت

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<any | null>(null);

    const handleEdit = (record: any) => {
        setRecordToEdit(record);
        setIsEditModalVisible(true);
    };

    const columns: ColumnsType<any> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%",
        },
        {
            title: "شکل مخزن",
            dataIndex: "Shape",
            key: "2",
        },
        {
            title: "ارتفاع",
            dataIndex: "Height",
            key: "7",
        },
        {
            title: "محیط",
            dataIndex: "Environment",
            key: "3",
        },
        {
            title: "حجم",
            dataIndex: "Volume",
            key: "4",
        },
        {
            title: "لوله خروجی مخزن",
            dataIndex: "OutletPipe",
            key: "5",
        },
        {
            title: "الکترو پمپ لوله خروجی",
            dataIndex: "OutletPipeElectroPump",
            key: "6",
        },
        {
            title: "دبی ورودی",
            dataIndex: "InletFlowRate",
            key: "7",
        },
        {
            title: "دبی خروجی",
            dataIndex: "OutputFlowRate",
            key: "8",
        },
        {
            title: "کارگروه استاندارد سازی",
            dataIndex: "HasConfirmation",
            key: "9",
            render: (_, record: any) => {
                let color = "";
                let name = "";
                let icon = <></>;
                if (record.IsActive === false) {
                    color = "red";
                    name = "ندارد";
                    icon = <CloseCircleOutlined />;
                } else {
                    color = "success";
                    name = "دارد";
                    icon = <CheckCircleOutlined />;
                }
                return (
                    <Tag icon={icon} color={color}>
                        {name}
                    </Tag>
                );
            },
        },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: "right",
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <Button
                        type="link"
                        className="text-secondary-500 font-bold"
                        onClick={() => {
                            handleEdit(record);
                        }}
                    >
                        ویرایش
                    </Button>
                    <Button
                        type="link"
                        className="text-red-500 font-bold"
                        onClick={() => {
                            handleDelete(record);
                        }}
                    >
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            <CustomeTable
                setInitialData={() => { }}
                isLoading={isValidating || isLoading}
                data={data}
                columns={columns}
            />
            {/* جذف */}
            <ConfirmDeleteModal
                loading={ldDelete}
                open={isDeleteModalVisible}
                setOpen={setIsDeleteModalVisible}
                handleDelete={handleConfirmDelete}
                title="مخزن"
            />
            {/* ویرایش */}
            <EditModal
                mutate={mutate}
                recordToEdit={recordToEdit}
                setRecordToEdit={setRecordToEdit}
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
            />
        </>
    );
}
