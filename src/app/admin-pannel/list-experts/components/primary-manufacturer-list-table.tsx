import {Button, Col, Modal, Row, Space, Table, Typography} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import {GetPage_ExeManager, Person} from "../../../../../interfaces/producer";
import {PlusIcon} from "@heroicons/react/24/outline";


export default function PrimaryManufacturerListTable({setModalVisible}: { setModalVisible: any }) {

    const [visibleDelete, setVisibleDelete] = useState(false);

    const {
        data,
        isLoading,
    } = useSWR<GetPage_ExeManager>("/Producer/GetPage_ExeManager", (url) => listFetcher(url, {
        arg: {
            "fromRecord": 0,
            "selectRecord": 100000
        }
    }))


    const columns: ColumnsType<Person & { Row: number }> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
        },
        {
            title: "نام کارشناس",
            dataIndex: "name",
            key: "2",
        },
        {
            title: "کد ملی",
            dataIndex: "name",
            key: "3",
        },
        {
            title: "شماره همراه",
            dataIndex: "nationalCode",
            key: "4",
        },
        {
            title: "وضعیت",
            dataIndex: "ceoName",
            key: "5",
        },
        {
            title: "اداره مربوطه",
            dataIndex: "companyOwnershipTypeName",
            key: "6",
        },
        {
            title: "استان مربوطه",
            dataIndex: "status",
            key: "7",
        },
        {
            title: "عملیات",
            fixed: "right",
            key: "8",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="text" onClick={() => setModalVisible(false)}>
                        ویرایش
                    </Button>
                    <Button type="text" danger onClick={() => setVisibleDelete(true)}>
                        حذف
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="box-border w-full p-6 mt-8">
            <div className="flex justify-between items-center">
                <Typography className="text-right text-[16px] font-normal">لیست تولید کننده ها</Typography>
                <Button
                    className="max-md:w-full flex justify-center items-center gap-2"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                        setModalVisible(true)
                    }}
                >
                    <PlusIcon width={24} height={24}/>
                    <span className="flex">
                            افزودن کارشناس
                        </span>
                </Button>
            </div>
            <Table
                loading={isLoading}
                className="mt-8"
                columns={columns}
                dataSource={addIndexToData(data?.records)}
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

            <Modal
                width={600}
                footer={[
                    <Row key={"box"} gutter={[16, 16]} className="my-2">
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-red-500"
                                type="primary"
                                // onClick={handleConfirmDelete}
                                key={"submit"}>
                                حذف
                            </Button>
                        </Col>
                        <Col xs={24} md={12}>
                            <Button
                                size="large"
                                className="w-full bg-gray-100 text-warmGray-500"
                                onClick={() => {
                                    setModalVisible(false)
                                }}
                                key={"cancel"}>
                                انصراف
                            </Button>
                        </Col>
                    </Row>
                ]}
                title="حذف کاربر"
                open={visibleDelete}
                onCancel={() => {
                    setVisibleDelete(false)
                }}
            >
                <p>آیا از حذف این کاربر مطمئن هستید؟</p>
            </Modal>

        </div>
    )
}