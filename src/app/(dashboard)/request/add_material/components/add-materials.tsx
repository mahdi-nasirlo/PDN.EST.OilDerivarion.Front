import React from 'react';
import {useValidation} from "@/hooks/use-validation";
import {Form} from "antd/lib";
import {Button, Col, Row, Typography} from "antd";
import {MaterialSelectField} from "@/components/fields/material-select-field";
import {PlusIcon} from "@heroicons/react/24/outline";
import {materialApi} from "../../../../../constance/material";
import {useRequestPackageMaterialAdd} from "@/hooks/material/use-request-package-material-add";

const apiData = materialApi.RequestPackageMaterialAdd

const AddMaterials = () => {

    const [form, rules] = useValidation(apiData.type)

    const addMaterial = useRequestPackageMaterialAdd()

    const handleSubmit = async (values: any) => {

        const res = await addMaterial.mutateAsync(values)

        if (res.success)
            form.resetFields()

    }
    return (
        <div>
            <div className="flex justify-start items-center mb-5">
                <PlusIcon className="w-6 ml-2 text-gray-800"/>
                <Typography className="text-[16px] font-semibold">افزودن مواد اولیه</Typography>
            </div>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Row gutter={[16, 10]}>
                    <Col xs={24} md={12}>
                        <Form.Item
                            name={"material_Uid"}
                            label="نام مواد اولیه"
                            rules={[rules]}
                        >
                            <MaterialSelectField/>
                        </Form.Item>
                    </Col>
                </Row>
                <div className="flex items-center justify-end">
                    <Button
                        disabled={addMaterial.isPending}
                        loading={addMaterial.isPending}
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ثبت
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddMaterials;