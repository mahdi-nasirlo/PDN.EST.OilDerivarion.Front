"use client";

import {Button, Col, Form, Row, Select} from "antd";
import React, {useState} from "react";
import {SvgIcon} from "@/components/layout/sidebar";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../../lib/server/mutationFetcher";
import {getCookie} from "cookies-next";


export default function PrimaryProductForm({mute}: { mute: any }) {

    const [dunsite, Setdunsite] = useState();

    const {
        data: selectableProduct,
        isMutating: isLDSelectable,
        trigger: getSelectableProduct
    } = useSWRMutation("/RequestDetail/GetAllProductSelectable", mutationFetcher);

    const {
        isMutating: isLDCreateProduct,
        trigger: createProduct
    } = useSWRMutation("/RequestDetail/CreateProduct", mutationFetcher)


    const onFinish = async (values: { productUid: string, densityType: boolean }) => {

        await createProduct(values.productUid)

        mute();

    };

    const ChangeDunsite = async (value: any) => {

        Setdunsite(value)

        await getSelectableProduct({
            requestMasterUid: getCookie("requestMasterUid"),
            densityType: value,
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
                        <Form.Item name="densityType" label="دانسیته محصول ">
                            <Select
                                placeholder="انتخاب نمایید"
                                onChange={ChangeDunsite}
                                tokenSeparators={[","]}
                                options={Character}
                                size="large"
                                value={dunsite}
                                fieldNames={{value: "is_Active", label: "Name"}}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        <Form.Item name="productUid" label="نام محصول">
                            <Select
                                loading={isLDSelectable}
                                fieldNames={{value: "Uid", label: "Name"}}
                                size="large"
                                placeholder="انتخاب نمایید"
                                disabled={typeof dunsite !== "boolean"}
                                tokenSeparators={[","]}
                                options={selectableProduct || []}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row dir="ltr">
                    <Button
                        icon={<SvgIcon src="/static/save.svg"/>}
                        danger
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ذخیره
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
