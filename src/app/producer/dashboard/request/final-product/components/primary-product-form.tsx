"use client";

import { Button, Col, Divider, Form, Row, Select } from "antd";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";
import { getCookie } from "cookies-next";
import useSWR from "swr";
import { DefaultOptionType } from "rc-select/es/Select";
import { useRouter } from "next/navigation";
import { mutationFetcher } from "../../../../../../../lib/server/mutationFetcher";
import { listFetcher } from "../../../../../../../lib/server/listFetcher";


export default function PrimaryProductForm() {

    const router = useRouter()

    const [dunsite, Setdunsite] = useState();

    const {
        data: selectableProduct,
        isMutating: isLDSelectable,
        trigger: getSelectableProduct
    } = useSWRMutation("/RequestDetail/GetAllProductSelectable", listFetcher);

    const {
        isMutating: isLDCreateProduct,
        trigger: createProduct
    } = useSWRMutation("/RequestDetail/CreateProduct", mutationFetcher)

    const {
        isLoading: ldDensity,
        data: density
    } = useSWR<DefaultOptionType[]>("/BaseInfo/GetAllDensityType", listFetcher)

    const onFinish = async (values: { productUid: string, densityType: boolean }) => {

        await createProduct({
            "requestMasterUid": getCookie("requestMasterUid"),
            "productUid": values.productUid,
            "densityTypeId": values.densityType
        })

        router.push("/producer/dashboard/request/final-preview")

    };

    const ChangeDunsite = async (value: any) => {

        console.log(value)

        Setdunsite(value)

        await getSelectableProduct({
            requestMasterUid: getCookie("requestMasterUid"),
            densityTypeId: value,
        })

    };

    return (
        <>
            <Form
                disabled={isLDCreateProduct}
                onFinish={onFinish}
                name="form_item_path"
                layout="vertical"
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]} name="densityType"
                            label="دانسیته محصول ">

                            <Select onChange={ChangeDunsite} placeholder="انتخاب نمایید" size="large"
                                loading={ldDensity} options={density}
                                fieldNames={{ value: "Id", label: "Name" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item rules={[{ required: true, message: "لطفا مقدار را وارد کنید" }]} name="productUid"
                            label="نام محصول">
                            <Select
                                loading={isLDSelectable}
                                fieldNames={{ value: "uid", label: "name" }}
                                size="large"
                                placeholder="انتخاب نمایید"
                                disabled={typeof dunsite !== "number"}
                                tokenSeparators={[","]}
                                options={selectableProduct || []}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row dir="ltr">
                    <Divider />

                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-3 justify-center ">ذخیره</span>
                    </Button>

                </Row>
            </Form>
        </>
    );
}

const Character = [
    {
        is_Active: true,
        Name: "بالا تر از 7/4",
    },
    {
        is_Active: false,
        Name: "پایین تر از 7/4",
    },
];
