"use client";


import { Button, Col, Modal, Row, Space, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import React, { useState } from 'react'
import { Gps } from "../../../../../interfaces/gps";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../../../lib/server/mutationFetcher";
import EditModal from "@/app/admin-panel/gps-devices/components/edit-modal";
import { addIndexToData } from "../../../../../lib/addIndexToData";


interface DataType {
    key: string;
    Row: number;
    ProductName: string;
    TrackingCode: string;
    ConfirmedRequestCode: string;
}


export default function DataTable({ isLoading, boxesData, mutate }: {
    isLoading: boolean,
    boxesData: any,
    mutate: () => void
}) {


    //حذف

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState<Gps | null>(null);


    //ادیت
    const [recordToEdit, setRecordToEdit] = useState<Gps>();
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);


    // مشاهده موقعیت

    const [isGPSModalVisible, setIsGPSEditModalVisible] = useState(false);

    const handleGPS = () => {
        setIsGPSEditModalVisible(true);
    };

    const handleCancelGPS = () => {
        setIsGPSEditModalVisible(false);
    };


    const { trigger, isMutating } = useSWRMutation("/GpsDevice/Delete", mutationFetcher)


    const handleDeleteSubmit = async () => {

        await trigger({ uid: recordToDelete?.Uid })

        setIsDeleteModalVisible(false)

        await mutate()

    }

    const columns: ColumnsType<Gps> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "کد",
            dataIndex: "Code",
            key: "2",
        },
        {
            title: "استان",
            dataIndex: "TrackingCode",
            key: "3",
        },
        {
            title: "فعال/غیر فعال ",
            dataIndex: "IsActive",
            key: "4",
            render: (e, record) => <Switch checked={record.IsActive} />,
        },
        {
            title: "مکان یابی",
            dataIndex: "ConfirmedRequest",
            key: "5",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className="text-primary-500 font-bold" onClick={() => handleGPS()}>مشاهده
                        موقعیت</Button>
                </Space>
            ),
        },
        {
            title: "عملیات",
            key: "عملیات",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" className="text-secondary-500 font-bold" onClick={() => {
                        setIsEditModalVisible(true);
                        setRecordToEdit(record)
                    }}> ویرایش</Button>
                    <Button type="link" className={"text-red-500 font-bold"}
                        onClick={() => {
                            setIsDeleteModalVisible(true);
                            setRecordToDelete(record)
                        }}>حذف</Button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Table
                loading={isLoading || isMutating}
                className="mt-6"
                columns={columns}
                dataSource={addIndexToData(boxesData)}
                pagination={{
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
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
                handleDelete={handleDeleteSubmit}
                title={"حذف جعبه"}
            />
            {/* ویرایش */}
            <EditModal
                recordeToEdit={recordToEdit}
                setModalVisible={setIsEditModalVisible}
                modalVisible={isEditModalVisible}
                mutate={mutate}
            />
            {/* مشاهده موقعیت */}
            <Modal
                title="مشاهده موقعیت"
                visible={isGPSModalVisible}
                onCancel={handleCancelGPS}
                width={800}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={24}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={handleCancelGPS}
                                key={"cancel"}
                            >
                                برگشت
                            </Button>
                        </Col>
                    </Row>
                ]}
            >
            </Modal>
        </>
    )
}

