"use client";

import {Space} from 'antd'
import {ColumnsType} from 'antd/es/table';
import React, {useState} from 'react'
import {Card} from '@/components/card';
import {z} from 'zod';
import basicApi from 'constance/basic';
import StateAction from "@/app/(dashboard)/(admin-panel)/role_determination/components/state-action";
import CustomTable from "@/components/custom-table";
import {ViewColumnsIcon} from "@heroicons/react/24/outline";

interface TProps {
    data: z.infer<typeof basicApi.GetUserBySearch.item>[] | undefined,
    isLoading: boolean
}


export default function DataTable({data, isLoading}: TProps) {

    const [roleModal, setRoleModal] = useState(false);
    const [StateModal, setStateModal] = useState<string>();


    const columns: ColumnsType<z.infer<typeof basicApi.GetUserBySearch.item>> = [
        {
            title: "ردیف",
            dataIndex: "Row",
            key: "1",
            width: "5%"
        },
        {
            title: "نام",
            dataIndex: "First_name",
            key: "2",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "Last_name",
            key: "2",
        },
        {
            title: "شماره ملی",
            dataIndex: "National_Code",
            key: "3",
        },
        // {
        //     title: "نقش",
        //     dataIndex: "UserTypeName",
        //     key: "4",
        //     render: (_, record) => {
        //         if ((record.UserTypeName) === null) {
        //             return <Typography> _ </Typography>
        //         } return <Typography>{(record.UserTypeName)}</Typography>
        //     }
        // },
        // {
        //     title: "استان",
        //     dataIndex: "State",
        //     key: "5",
        //     render: (_, record) => {
        //         // if ((record.State) === null) {
        //         //     return <Typography> _ </Typography>
        //         // }
        //         return <Typography>{}</Typography>
        //     }
        // },
        {
            title: "عملیات",
            key: "عملیات",
            align: "center",
            fixed: 'right',
            width: "10%",
            render: (_, record) => (
                <Space size="small">
                    <button
                        className="text-secondary-500 font-bold py-2 px-2"
                        onClick={() => setRoleModal(true)}
                    >
                        تعیین نقش
                    </button>
                    <button
                        className="text-secondary-500 font-bold  py-2 px-2"
                        onClick={() => setStateModal(record.SSO_Uid)}
                    >
                        تعیین استان
                    </button>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Card className="mt-8">
                <CustomTable
                    header={{
                        icon: <ViewColumnsIcon/>,
                        text: 'لیست کاربران',
                    }}
                    setInitialData={() => {
                    }}
                    isLoading={isLoading}
                    data={data}
                    columns={columns}
                />
            </Card>
            <StateAction open={StateModal} setOpen={setStateModal}/>
            {/* نقش */}
            {/*<Modal*/}
            {/*    title={'تعیین نقش'}*/}
            {/*    open={roleModal}*/}
            {/*    onCancel={() => setRoleModal(false)}*/}
            {/*    width={600}*/}
            {/*    footer={[*/}
            {/*        <Row key={"box"} gutter={[16, 16]} className="my-2">*/}
            {/*            <Col xs={12} md={12}>*/}
            {/*                <Button*/}
            {/*                    // loading={loading}*/}
            {/*                    size="large"*/}
            {/*                    className="w-full"*/}
            {/*                    type="primary"*/}
            {/*                    onClick={() => setRoleModal(false)}*/}
            {/*                    key={"submit"}>*/}
            {/*                    ثبت*/}
            {/*                </Button>*/}
            {/*            </Col>*/}
            {/*            <Col xs={12} md={12}>*/}
            {/*                <Button*/}
            {/*                    // disabled={loading}*/}
            {/*                    size="large"*/}
            {/*                    className="w-full bg-gray-100 text-warmGray-500"*/}
            {/*                    onClick={() => setRoleModal(false)}*/}
            {/*                    key={"cancel"}>*/}
            {/*                    انصراف*/}
            {/*                </Button>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <Form layout='vertical'>*/}
            {/*        <Row gutter={[16, 16]}>*/}
            {/*            <Col xs={24}>*/}
            {/*                <Form.Item label="نقش" name="state">*/}
            {/*                    <MultipleSelect />*/}
            {/*                </Form.Item>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Form>*/}
            {/*</Modal >*/}
        </>
    )
}
