import React, { useContext, useState } from 'react';
import { Col, Form, FormInstance, Row, Select } from "antd";
import useGetAllDensityType from "../../../../../../../../hooks/baseInfo/useGetAllDensityType";
import useGetAllProductSelectable from "../../../../../../../../hooks/requestDetail/useGetAllProductSelectable";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import { filterOption } from '../../../../../../../../lib/filterOption';

const SelectProductForm = ({ form }: { form: FormInstance<any> }) => {

    const processController = useContext(StepContext)

    const densityData = useGetAllDensityType()

    const productSelectableData = useGetAllProductSelectable()

    const [density, setDensity] = useState();

    const ChangeDensity = async (value: any) => {

        setDensity(value);

        await productSelectableData.getSelectableProduct({
            requestMasterUid: processController.requestMaster.requestMasterUid,
            densityTypeId: value,
        });

        form.setFieldValue('productUid', null);
    };


    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Form.Item
                        name="densityTypeId"
                        label="دانسیته محصول"
                        labelCol={{ span: 24 }}
                        rules={[{ required: true, message: "لطفا دانسیته محصول را انتخاب کنید" }]}
                    >

                        <Select
                            onChange={ChangeDensity}
                            options={densityData.density}
                            loading={densityData.ldDensity}
                            fieldNames={densityData.fieldNames}
                            size="large"
                            placeholder="انتخاب نمایید"
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item
                        labelCol={{ span: 24 }}
                        name="productUid"
                        label="نام محصول"
                        rules={[{ required: true, message: "لطفا محصول را انتخاب کنید" }]}
                    >
                        <Select
                            showSearch
                            // @ts-ignore
                            filterOption={filterOption}
                            loading={productSelectableData.isLDSelectable}
                            fieldNames={{ value: "uid", label: "name" }}
                            size="large"
                            placeholder="انتخاب نمایید"
                            disabled={typeof density !== "number"}
                            tokenSeparators={[","]}
                            options={productSelectableData.selectableProduct}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default SelectProductForm;