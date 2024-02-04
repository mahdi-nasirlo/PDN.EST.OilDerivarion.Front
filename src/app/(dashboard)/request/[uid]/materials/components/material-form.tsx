import useRequestPackageMaterialList from '@/hooks/material/use-request-package-material-list'
import { Col, Form, Row, Select } from 'antd'
import React from 'react'

export default function MaterialForm() {

    const MaterialPackage = useRequestPackageMaterialList()

    return (
        <Row gutter={[16, 10]}>
            <Col xs={24} md={12}>
                <Form.Item
                    name={"material_Uid"}
                    label="نام مواد اولیه"
                // rules={[rules]}
                >
                    <Select
                        options={MaterialPackage.options}
                        loading={MaterialPackage.isLoading}
                        size='large'
                        placeholder='انتخاب کنید'
                    />
                </Form.Item>
            </Col>
        </Row>
    )
}
