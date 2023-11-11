import React from 'react';
import {Col, Form, FormInstance, Input, Row} from "antd";
import CustomeDatePicker from "../../../../../../../components/CustomeDatePicker";

interface PropsType {
    onFinish: (arg?: any) => any,
    form: FormInstance,
}


const DateOfVisitForm = (props: PropsType) => {


    return (
        <Form
            onFinish={props.onFinish}
            // disabled={isMutating}
            form={props.form}
            layout="vertical"
            className="mb-3"
        >
            <Row gutter={[16, 16]}>
                <Col xs={24} md={24}>
                    <Form.Item
                        rules={[{required: true}]}
                        name="description"
                        label=" توضیحات کارشناس نفت"
                    >
                        <Input size="large" placeholder="وارد کنید"/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        rules={[{required: true}]}
                        name="datePersian1"
                        label="تاریخ بازدید کارشناس نفت"
                    >
                        <CustomeDatePicker/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        rules={[{required: true}]}
                        name="datePersian2"
                        label="تاریخ بازدید کارشناس نفت"
                    >
                        <CustomeDatePicker/>
                    </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                    <Form.Item
                        rules={[{required: true}]}
                        name="datePersian3"
                        label="تاریخ بازدید کارشناس نفت"
                    >
                        <CustomeDatePicker/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default DateOfVisitForm;