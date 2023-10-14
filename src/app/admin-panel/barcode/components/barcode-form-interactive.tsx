import React, {useState} from 'react';
import {Col, Form, Input, Select} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {PlusIcon} from "@heroicons/react/24/outline";
import BarcodeFormLockup from "@/app/admin-panel/barcode/components/barcode-form-lockup";


function BarcodeFormInteractive(props: { ID: number | undefined, name: string | undefined }) {

    const [open, setOpen] = useState(false)

    const {
        isLoading: isLdMaterial,
        data: materials
    } = useSWR(
        props.ID === 2 ? "/RequestDetail/GetAllMaterial" : null,
        (url) => listFetcher(url, {
            arg: {
                requestMasterUid: null,
                isLastStep: null
            }
        })
    )

    const {
        isLoading: isLdProduct,
        data: products
    } = useSWR(
        props.ID === 3 ? "/RequestDetail/GetAllProduct" : null,
        (url) => listFetcher(url, {
            arg: {
                requestMasterUid: null,
                isLastStep: null
            }
        })
    )

    const {
        isLoading: isLdRequestMaster,
        data: requestMasters
    } = useSWR(
        props.ID === 3 ? "/RequestDetail/GetAllProduct" : null,
        (url) => listFetcher(url, {
            arg: {
                requestMasterUid: null,
                isLastStep: null
            }
        })
    )

    if (props.ID === null) {
        return <></>
    }


    if (props.ID === 1) {
        return <>
            <Col xs={24} md={12}>
                <Form.Item
                    name="requestMasterUid"
                    label="لیست درخواست ها"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Input
                        size="large"
                        placeholder={"انتخاب کنید"}
                        addonAfter={<><PlusIcon onClick={() => setOpen(true)} className="cursor-pointer" width="12"
                                                height="12"/></>}
                    />
                    {/*<Select*/}
                    {/*    showSearch*/}
                    {/*    fieldNames={{value: "Uid", label: "MaterialName"}}*/}
                    {/*    loading={isLdMaterial}*/}
                    {/*    options={materials}*/}
                    {/*    size="large"*/}
                    {/*    placeholder="انتخاب کنید"*/}
                    {/*/>*/}
                </Form.Item>
            </Col>
            <BarcodeFormLockup open={open} setOpen={setOpen}/>
        </>
    }

    if (props.ID === 2) {
        return <>
            <Col xs={24} md={12}>
                <Form.Item
                    name="requestDetailUid"
                    label="مواد اولیه"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        fieldNames={{value: "Uid", label: "MaterialName"}}
                        loading={isLdMaterial}
                        options={materials}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
        </>
    }

    if (props.ID === 3) {

        return <>
            <Col xs={24} md={12}>
                <Form.Item
                    name="requestDetailUid"
                    label="محصول"
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید",
                        },
                    ]}
                >
                    <Select
                        showSearch
                        fieldNames={{value: "Uid", label: "ProductName"}}
                        loading={isLdProduct}
                        options={products}
                        size="large"
                        placeholder="انتخاب کنید"
                    />
                </Form.Item>
            </Col>
        </>
    }
}


export default BarcodeFormInteractive;