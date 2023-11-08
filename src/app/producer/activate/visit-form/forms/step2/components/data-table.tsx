import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import { Button, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import EditModal from "./edit-modal";


export default function DataTable() {

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] =
        useState<any | null>(null);

    const handleDelete = (record: any) => {
        setRecordToDelete(record);
        setIsDeleteModalVisible(true);
    };

    // const { trigger: DeleteLicense, isMutating: ldDeleteLicense } =
    //     useSWRMutation("/ProfilePersonLicense/Delete", mutationFetcher);

    const handleConfirmDelete = async () => {
        console.log(recordToDelete);

        //     const res = await DeleteLicense({
        //         uid: recordToDelete?.Uid,
        //     });

        //     await mutate();
        //     if (res) {
        //         setIsDeleteModalVisible(false);

        //         setRecordToDelete(null);
        //     }
    };

    //ادیت

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [recordToEdit, setRecordToEdit] = useState<any | null>(
        null
    );

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
            dataIndex: "name",
            key: "2",
        },
        {
            title: "ارتفاع",
            dataIndex: "number",
            key: "7",
        },
        {
            title: "محیط",
            dataIndex: "licenseTypeName",
            key: "3",
        },
        {
            title: "حجم",
            dataIndex: "exporter",
            key: "4",
        },
        {
            title: "لوله خروجی مخزن",
            dataIndex: "issueDatePersian",
            key: "5",
        },
        {
            title: "الکترو پمپ لوله خروجی",
            dataIndex: "expirationDatePersian",
            key: "6",
        },
        {
            title: "دبی ورودی",
            dataIndex: "expiration",
            key: "7",
        },
        {
            title: "دبی خروجی",
            dataIndex: "Persian",
            key: "8",
        },
        {
            title: "کارگروه استاندارد سازی",
            dataIndex: "expirationDate",
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
            <Table
                // loading={ldMainMember || ldDeleteLicense || isValidating}
                className="mt-6"
                columns={columns}
                dataSource={data}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: false,
                    defaultCurrent: 1,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
            />
            {/* جذف */}
            <ConfirmDeleteModal
                open={isDeleteModalVisible}
                setOpen={setIsDeleteModalVisible}
                handleDelete={handleConfirmDelete}
                title="مخزن محصول"
            />
            {/* ویرایش */}
            <EditModal
                // mutate={mutate}
                recordToEdit={recordToEdit}
                setRecordToEdit={setRecordToEdit}
                setIsEditModalVisible={setIsEditModalVisible}
                isEditModalVisible={isEditModalVisible}
            />
        </>
    );
}


const data = [{
    Row: "1",
    name: "تست",
    number: "98",
    licenseTypeName: "98",
    exporter: "12",
    issueDatePersian: "9876",
    expirationDatePersian: "12561897",
    expiration: "46",
    Persian: "13",
    expirationDate: "897"


}]