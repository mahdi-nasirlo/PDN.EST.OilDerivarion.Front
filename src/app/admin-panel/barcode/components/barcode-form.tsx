import React, {useState} from 'react';
import {Col, Form, Row, Select} from "antd";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import useSWR from "swr";

function BarcodeForm() {

    const [containerType, setContainerType] = useState<{ Id: number, Name: string }>()

    const {isLoading: ldContainer, data: containers} = useSWR("/BaseInfo/GetAllContainerType", listFetcher)

    const {
        isLoading: ldUsePlaceType,
        data: usePlaceType
    } = useSWR("/BaseInfo/GetAllBarcodeUsePlaceType", listFetcher)

    const {isLoading: ldSampleType, data: sampleTypes} = useSWR("/BaseInfo/GetAllSampleType", listFetcher)

    const {
        isLoading: isLdMaterial,
        data: materials
    } = useSWR("/Material/GetAll", (url) => listFetcher(url, {arg: {name: "", isActive: null}}))

    const {
        isLoading: isLdProduct,
        data: products
    } = useSWR("/Product/GetAll", (url) => listFetcher(url, {arg: {name: "", isActive: null}}))

    const {isLoading: isLdGps, data: gps} = useSWR("/GpsDevice/GetAll", (url) => listFetcher(url, {
        arg: {
            "code": "",
            "isActive": null
        }
    }))


    return (
        <Row gutter={[32, 1]}>
            <Col xs={24} md={12}>
                <Form.Item
                    name="containerTypeId"
                    label="نوع ظرف"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        // @ts-ignore
                        onChange={(value, option: { ID: number, Name: string }) => setContainerType(option)}
                        showSearch
                        fieldNames={{value: "Id", label: "Name"}}
                        loading={ldContainer}
                        options={containers}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
            <Col className={`${!containerType && "hidden"}`} xs={24} md={12}>
                <Form.Item
                    name="requestDetailUid"
                    label={containerType?.Name}
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        fieldNames={{value: "Id", label: containerType?.Id === 1 ? "Code" : "Name"}}
                        loading={isLdMaterial || isLdGps || isLdProduct}
                        options={containerType?.Id === 1 ? gps : containerType?.Id === 2 ? materials : products}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    name="barcodeUsePlaceTypeId"
                    label="نوع محل استفاده بارکد"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        fieldNames={{value: "Id", label: "Name"}}
                        loading={ldUsePlaceType}
                        options={usePlaceType}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    name="sampleTypeId"
                    label="نوع نمونه"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        fieldNames={{value: "Id", label: "Name"}}
                        loading={ldSampleType}
                        options={sampleTypes}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
        </Row>
    );
}

// @ts-ignore
export default BarcodeForm;