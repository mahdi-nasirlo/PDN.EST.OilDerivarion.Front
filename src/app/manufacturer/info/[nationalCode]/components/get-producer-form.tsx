import { Col, Form, Input, Row, Spin } from 'antd'
import { useForm } from 'antd/es/form/Form'
import useSWR from "swr";
import React, { useEffect } from 'react'
import { listFetcher } from '../../../../../../lib/server/listFetcher';

export default function GetProducerForm({ params }: { params: { nationalCode: string } }) {

    const [form] = useForm()

    const { data, isLoading } = useSWR<any>("/Company/GetProducer", (url) => listFetcher(url, {
        arg: { nationalCode: params.nationalCode }
    }))

    useEffect(() => {

        form.setFieldsValue(data)

    }, [data])


    return (
        <Spin spinning={isLoading}>
            <Form disabled={isLoading} form={form} initialValues={data?.data} name="form_item_path"
                layout="vertical">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="name" label="نام واحد تولیدی">
                            <Input disabled size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="nationalCode" label="شماره ملی">
                            <Input disabled size="large" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item name="companyOwnershipTypeName" label="نوع مالکیت">
                            <Input disabled size="large" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="companyStatusName" label="وضعیت حساب کاربری">
                            <Input disabled size="large" />
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </Spin>)
}
