import useRequestPackageMaterialList from '@/hooks/material/use-request-package-material-list'
import {Col, Form, Row, Select} from 'antd'
import React from 'react'
import {Rule} from "rc-field-form/es/interface";
import PercentageInput from "@/components/inputs/percentage-input";

export default function MaterialForm({rules, package_uid}: { rules: Rule, package_uid?: string }) {

    const MaterialPackage = useRequestPackageMaterialList({package_UID: package_uid})

    return (
        <Row gutter={[16, 10]}>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="material_UID"
                    label="نام مواد اولیه"
                    rules={[rules]}
                >
                    <Select
                        options={MaterialPackage.options}
                        loading={MaterialPackage.isLoading}
                        size='large'
                        placeholder='انتخاب کنید'
                    />
                </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
                <Form.Item
                    name="darsad_Estefadeh"
                    label="درصد استفاده"
                    rules={[rules]}
                >
                    <PercentageInput />
                </Form.Item>
            </Col>
        </Row>
    )
}
