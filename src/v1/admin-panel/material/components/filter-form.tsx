"use client";

import { Col, Form, Input, Row, Select } from "antd";
import React from "react";
import { useForm } from "antd/lib/form/Form";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { filterOption } from "../../../../../lib/filterOption";
import ButtonFilter from "../../../../../components/ButtonFilter";
import { sortByIndex } from "../../../../../lib/sortByIndex";

export default function FilterForm({
    filter,
    unsetFilter,
    isLoading
}: {
    filter: (arg: MaterialGet) => void;
    unsetFilter: () => void;
    isLoading: boolean
}) {
    const [form] = useForm();

    // const { data: MaterialTestItem, isLoading: ldMaterialTestItem } = useSWR("/MaterialTestItem/GetAll", (url) =>
    //   listFetcher(url, { arg: { name: null, IsActive: null, }, })
    // );

    const { data: Measure, isLoading: ldMeasure } = useSWR(
        "/Measure/GetAll",
        (url) => listFetcher(url, { arg: { name: null, IsActive: null } })
    );

    return (
        // <div className="box-border w-full p-6">
        <Form onFinish={filter} form={form} layout="vertical">
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item name="name" label="نام ماده اولیه">
                        <Input size="large" placeholder="وارد کنید" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                    <Form.Item name="IsActive" label="فعال / غیر فعال">
                        <Select
                            size="large"
                            options={[
                                { label: "فعال", value: true },
                                { label: "غیر فعال", value: false },
                            ]}
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                    <Form.Item name="MeasureUid" label="واحد اندازه گیری">
                        <Select
                            showSearch
                            // @ts-ignore
                            filterOption={filterOption}
                            options={sortByIndex(Measure, 'Name')}
                            loading={ldMeasure}
                            fieldNames={{ value: "Uid", label: "Name" }}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col>
                {/* <Col xs={24} md={12}>
                    <Form.Item name="TestItems" label="فاکتور آزمون ">
                        <Select
                            options={MaterialTestItem}
                            loading={ldMaterialTestItem}
                            fieldNames={{ value: "TestItemUid", label: "TestItemName" }}
                            size="large"
                            placeholder="انتخاب کنید"
                        />
                    </Form.Item>
                </Col> */}
            </Row>
            <ButtonFilter
                unsetFilter={unsetFilter}
                isLoading={isLoading}
            />
        </Form>
        // </div>
    );
}
