import { Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react'
import ButtonFilter from '../../../../../components/ButtonFilter';

export default function FilterForm({
    filter,
    unsetFilter,
    isLoading
}: {
    filter: (arg: any) => void;
    unsetFilter: () => void;
    isLoading: boolean;
}) {
    const [form] = useForm();

    return (
        // <div className="box-border w-full p-6">
        <Form onFinish={filter} form={form} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="name"
                        label="نام تواید کننده"
                    >
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
            </Row>
            <ButtonFilter
                unsetFilter={unsetFilter}
                isLoading={isLoading}
            />
        </Form>
        // </div>
    );
}
