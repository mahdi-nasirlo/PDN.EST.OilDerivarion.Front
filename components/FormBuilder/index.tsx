"use client"

import React from 'react';
import {Button, Col, Form, Row, Spin, Tabs, Typography} from "antd";
import TextInput from "./inputs/TextInput";
import {useForm} from "antd/es/form/Form";

export interface FormBuilderInputType {
    Form_Field_ID: string,
    Form_Id: string,
    FieldType: string,
    Max_Value?: number,
    Min_Value?: number,
    Default_Value: string,
    Is_Required: boolean,
    OnChange_Inf: string,
    Extended_Dat: string,
    Regular_Expertise: string,
    Title_Style: string,
    Feild_Style: string,
    Counting_Position: number,
    Placeholder?: string
}

interface FormType {
    Title: string,
    FormFields: FormBuilderInputType[]
}

interface PropsType {
    Title?: string,
    Description?: string,
    Forms: FormType[]
}


const Index = ({items, loading = false}: { items: PropsType[], loading?: boolean }) => {

    if (loading) {
        return <Spin spinning={true}/>
    }

    return (
        items?.map((value, index) => <><RenderForm item={value}/></>)
    );
};


const RenderForm = (props: { item: PropsType }) => {

    const data = props.item

    const renderFormType = () => {

        let formType

        if (data.Forms.length > 1) formType = <FormTabType data={data}/>

        if (data.Forms.length === 1) formType = <FormSimpleType data={data.Forms[0]}/>

        return formType
    }

    return <>
        <div>
            <div>
                <Typography.Title level={5} className="text-gray-901 text-right">
                    {data.Title}
                </Typography.Title>
                <div className="w-full text-right text-sm text-gray-300">
                    {data.Description}
                </div>
                <div>
                    {renderFormType()}
                </div>
            </div>
        </div>
    </>
}

const FormTabType = ({data}: { data: PropsType }) => (<Tabs
    type="card"
    defaultActiveKey="0"
    items={data.Forms.map((value, index) => ({
        key: `${index}`,
        label: value.Title,
        children: <RenderInputs item={value.FormFields}/>
    }))}
/>)

const FormSimpleType = ({data}: { data: FormType }) => (<RenderInputs item={data.FormFields}/>)

const RenderInputs = (props: { item: FormBuilderInputType[] }) => {

    const [form] = useForm()

    return <>
        <Form form={form}>
            <Row gutter={[16, 10]}>
                {props?.item?.map((value, index) => <RenderInput key={index} item={value}/>)}
            </Row>
            {props.item.length > 0 && <div className="flex justify-end">
                <Button htmlType="submit" type="primary">
                    ذخیره
                </Button>
            </div>}
        </Form>
    </>
}

const RenderInput = ({item}: { item: FormBuilderInputType }) => {

    let currentInput

    console.log(item)

    switch (item.FieldType) {
        case "textInput":
            currentInput = <TextInput data={item} placeholder={item?.Placeholder || "وارد کنید"}/>
    }

    if (!currentInput) {
        return <></>
    }

    return <Col xs={24} md={8}>{currentInput}</Col>
}

export default Index;