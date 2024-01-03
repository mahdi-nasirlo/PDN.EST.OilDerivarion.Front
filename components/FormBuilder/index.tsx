"use client"

import React, { useEffect } from 'react';
import { Button, Col, Divider, Form, Row, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import TextInput from "./inputs/TextInput";
import InputNumber from "./inputs/InputNumber";
import Select from "./inputs/Select";
import RadioBtn from "./inputs/RadioBtn";
import { updatedObject } from "../../utils/method";

export interface FormBuilderInputType {
    Name: string,
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
    FormFieldDetails?: {
        Form_Filed_Detail_ID: string,
        Form_Field_ID: string,
        Value: string,
        Text: string
    }[]
}

export interface FormType {
    Title: string,
    Form_ID: string,
    Form_Key: string,
    Description: string,
    FormFields: FormBuilderInputType[],
    Mode: number
}

export interface FormSchemaType {
    Title?: string,
    Description?: string,
    Forms: FormType[]
}

const Index = (props: {
    item: FormType,
    initialValues?: any,
    title?: boolean,
    onSet: (data: any, formID: string) => any
}) => {

    const data = props.item

    return <>
        {props.title && <>
            <Typography.Title level={5} className="text-gray-901 text-right">
                {data.Title}
            </Typography.Title>
            <Typography className="w-full text-right text-sm">
                {data.Description}
            </Typography>
        </>}
        <RenderInputs
            initialValues={props.initialValues}
            item={data.FormFields}
            onSet={props.onSet}
            formID={data.Form_Key}
        />
    </>
}


const RenderInputs = (props: {
    item: FormBuilderInputType[],
    onSet: (data: any, formID: string) => any,
    formID: string,
    initialValues?: any
}) => {

    const [form] = useForm()


    useEffect(() => {
        if (props.initialValues) {

            form.setFieldsValue(updatedObject(props.initialValues))

        }
    }, [props.initialValues])


    return <>
        <Form form={form} onFinish={values => props.onSet(values, props.formID)}
            className="mt-4">
            <Row gutter={[16, 10]}>
                {props?.item
                    ?.sort((a, b) => a.Counting_Position - b.Counting_Position)
                    .map((value) => (
                        <RenderInput key={value.Counting_Position} item={value} />
                    ))}
            </Row>
            <Divider />
            {props.item.length > 0 && <div className="flex justify-end mt-5">
                <Button htmlType="submit" type="primary">
                    ذخیره
                </Button>
            </div>}
        </Form>
    </>
}

const RenderInput = ({ item }: { item: FormBuilderInputType }) => {

    let currentInput

    switch (item.FieldType) {
        case "textInput":
            currentInput = <TextInput data={item} placeholder={item?.Placeholder || "وارد کنید"} />;
            break
        case "inputNubmer":
            currentInput = <InputNumber data={item} />
            break
        case "select":
            currentInput = <Select data={item} />
            break
        case "radioBtn":
            currentInput = <RadioBtn data={item} />
            break
        default:
            currentInput = <Typography>فیلد مورد نظر پشتیبانی نمی شود</Typography>
            break;
    }

    return <Col xs={24} md={8}>{currentInput}</Col>
}

export default Index;