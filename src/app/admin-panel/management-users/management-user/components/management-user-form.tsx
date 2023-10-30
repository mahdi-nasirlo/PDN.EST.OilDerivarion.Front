import { Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react'
import { listFetcher } from '../../../../../../lib/server/listFetcher';
import useSWR from 'swr';
import { filterOption } from '../../../../../../lib/filterOption';


export default function ManagementUserForm(
    { form, handleConfirmEdit, isMutating }:
        { form: any, handleConfirmEdit: any, isMutating: any }
) {

    const { data, isLoading } = useSWR("/BaseInfo/UserTypeGetAll", listFetcher);

    const [userTypeId, setUserTypeId] = useState<any>(null);

    const userTest = (type: "URL" | "INITIAL_VALUE") => {

        let targetUrl;
        let targetInitial;

        if (userTypeId === 2) {
            targetUrl = "/Lab/GetAll"
            targetInitial = {
                name: null,
                isActive: true
            }
        } else {
            targetUrl = "/Producer/GetAll"
            targetInitial = {
                name: null,
                producerStatusId: null
            }
        }

        if (type === "INITIAL_VALUE") {
            return targetInitial
        }

        if (type === "URL") {
            return targetUrl
        }

    };
    const { data: test, isLoading: ldTest } = useSWR([userTest("URL"), userTest("INITIAL_VALUE")], ([url, arg]: [url: string, arg: any]) => listFetcher(url, { arg }));
    const { data: Status, isLoading: ldStatus } = useSWR("/BaseInfo/StateGetAll", (url: string) => listFetcher(url));

    let userTypeSpecific;
    switch (userTypeId) {
        case 2:
            userTypeSpecific = "labUid";
            break;
        case 3:
            userTypeSpecific = "producerUid";
            break;
    }


    const userTypeName = userTypeId === 2 ? "آزمایشگاه" : "تولید کننده";

    const inputField = (userTypeId === 3 || (userTypeId >= 2 && userTypeId <= 3)) ? (
        <Col xs={24} md={12}>
            <Form.Item
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name={userTypeSpecific}
                label={userTypeName}
            >
                <Select
                    showSearch
                    fieldNames={{ label: "Name", value: "Uid" }}
                    //@ts-ignore
                    filterOption={filterOption}
                    options={test}
                    loading={ldTest}
                    size="large"
                    placeholder="انتخاب کنید"
                />
            </Form.Item>
        </Col >
    ) : null;

    const inputStatus = (userTypeId === 3 || userTypeId >= 4) ? (
        <Col xs={24} md={12}>
            <Form.Item
                rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                name="StateId"
                label="استان"
            >
                <Select
                    showSearch
                    fieldNames={{ label: "Name", value: "Id" }}
                    //@ts-ignore
                    filterOption={filterOption}
                    options={Status}
                    loading={ldStatus}
                    size="large"
                    placeholder="انتخاب کنید"
                />
            </Form.Item>
        </Col>
    ) : null;


    return (
        <Form form={form} onFinish={handleConfirmEdit} disabled={isMutating} layout="vertical">
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]
                        }
                        name="FirstName"
                        label="نام"
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]
                        }
                        name="LastName"
                        label="نام خانوادگی"
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]
                        }
                        name="NationalCode"
                        label="کد ملی"
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]
                        }
                        name="IsActive"
                        label="فعال/غیر فعال"
                    >
                        <Select
                            options={[
                                { value: true, label: "فعال" },
                                { value: false, label: "غیر فعال" },
                            ]}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[32, 1]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]}
                        name="UserTypeId"
                        label="نوع کاربر"
                    >
                        <Select
                            showSearch
                            fieldNames={{ label: "Name", value: "Id" }}
                            //@ts-ignore
                            filterOption={filterOption}
                            loading={isLoading}
                            options={data}
                            size="large"
                            placeholder="انتخاب کنید"
                            onChange={(value) => {
                                setUserTypeId(value);
                            }}
                        />
                    </Form.Item>
                </Col>
                {inputField}
                {inputStatus}
            </Row>
        </Form>
    )
}
