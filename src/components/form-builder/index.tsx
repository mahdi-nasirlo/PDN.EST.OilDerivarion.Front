"use client"

import React, {useEffect} from 'react';
import {Button, Col, Divider, Typography} from "antd";
import {z} from "zod";
import {formMakerApi} from "../../constance/form-maker";
import {CheckboxOptionType, Form, Row, SelectProps} from "antd/lib";
import TextInput from "@/components/form-builder/inputs/text-input";
import {useValidation} from "@/hooks/use-validation";
import {errorMessage} from "../../constance/error-message";
import {Rule} from "rc-field-form/es/interface";
import InputNumber from "@/components/form-builder/inputs/Input-number";
import PercentInput from "@/components/form-builder/inputs/percent-Input";
import Select from "@/components/form-builder/inputs/select";
import RadioBtn from "@/components/form-builder/inputs/radio-btn";
import {updatedObject} from "../../../utils/method";
import NaturalNumber from "@/components/form-builder/inputs/natural-number";
import {motion} from "framer-motion";


const Index = (props: {
    item: z.infer<typeof formMakerApi.Get.form>,
    initialValues?: any,
    title?: boolean,
    isLoading?: boolean,
    onSet: (data: any, formID: string) => any
}) => {

    const data = props.item

    return <>
        {data.Title && <>
            <Typography.Title level={5} className="text-gray-901 text-right">
                {data.Title}
            </Typography.Title>
        </>}
        <Divider/>
        {/*<Spin spinning={props.isLoading}>*/}
            <RenderInputs
                initialValues={props.initialValues}
                item={data.FormFields}
                onSet={props.onSet}
                formID={data.Form_Key as string}
            />
        {/*</Spin>*/}
    </>
}


const RenderInputs = (props: {
    item: z.infer<typeof formMakerApi.Get.formFields>[],
    onSet: (data: any, formID: string) => any,
    formID: string,
    initialValues?: any
}) => {

    const validation = createValidation(props.item)

    const [form, rules] = useValidation(validation)


    useEffect(() => {
        if (props.initialValues) {

            form.setFieldsValue(updatedObject(props.initialValues))

        }
    }, [props.initialValues])

    return <>
        <Form
            form={form}
            onFinish={values => props.onSet(values, props.formID)}
            className="mt-4"
            layout="vertical"
        >
            <Row gutter={[16, 10]}>
                {props?.item
                    ?.sort((a, b) => a.Counting_Position - b.Counting_Position)
                    .map((value, index) => (
                        <Col xs={12} md={8} lg={8} xl={6}>
                            <motion.div
                                key={index}
                                className="relative"
                                transition={{delay: index * 0.1, duration: 0.1, ease: "easeIn"}}
                                initial={{
                                    opacity: 0,
                                    left: -12,
                                }}
                                animate={{
                                    opacity: 1,
                                    left: 0
                                }}
                            >
                                <RenderInput key={value.Counting_Position} item={value} rules={rules}/>
                            </motion.div>
                        </Col>
                    ))}
            </Row>
            <Divider/>
            {props.item.length > 0 && <div className="flex justify-end mt-5">
                <Button
                    size="large"
                    htmlType="submit"
                    type="primary"
                >
                    ذخیره
                </Button>
            </div>}
        </Form>
    </>
}

const RenderInput = ({item, rules}: { item: z.infer<typeof formMakerApi.Get.formFields>, rules: Rule }) => {

    const selectOptions: SelectProps["options"] = item?.FormFieldDetails?.map((value, index) => ({
        value: value.Text,
        label: value.Text
    }))

    const radioGroupOptions: CheckboxOptionType[] | undefined = item.FormFieldDetails?.map((item) => ({
        value: item.Text,
        label: item.Text,
        title: item.Text,
    }))

    let currentInput

    switch (item.FieldType) {
        case "textInput":
            currentInput = <TextInput/>;
            break
        case "inputNumber":
            currentInput = <InputNumber data={item}/>
            break
        case "select":
            currentInput = <Select options={selectOptions}/>
            break
        case "radioBtn":
            currentInput = <RadioBtn options={radioGroupOptions}/>
            break
        case "percentInput":
            currentInput = <PercentInput/>
            break
        case "naturalNumber":
            currentInput = <NaturalNumber/>
            break
        // default:
        //     currentInput = <Typography>فیلد مورد نظر پشتیبانی نمی شود</Typography>
        //     break;
    }

    return <Form.Item
            name={item.Name}
            label={item.Title_Style}
            rules={[rules]}
        >
            {currentInput}
        </Form.Item>
}

const createValidation = (fields: z.infer<typeof formMakerApi.Get.formFields>[]) => {

    const fieldSchemas = fields.map(field => {

        const {FieldType, Max_Value, Min_Value} = field

        let fieldSchema;

        if (FieldType === "inputNumber")
            fieldSchema = z.number({
                required_error: errorMessage.number_invalid,
                invalid_type_error: errorMessage.number_invalid
            }).min(Min_Value).max(Max_Value)

        if (FieldType === "radioBtn")
            fieldSchema = z.string({
                required_error: errorMessage.required_choice,
                invalid_type_error: errorMessage.required_choice
            })

        if (FieldType === "percentInput")
            fieldSchema = z.number({
                required_error: errorMessage.number_invalid,
                invalid_type_error: errorMessage.number_invalid
            }).finite().min(0.01).max(100)

        if (FieldType === "textInput")
            fieldSchema = z.string({required_error: errorMessage.required})

        if (FieldType === "select")
            fieldSchema = z.string({required_error: errorMessage.required_choice})

        if (FieldType === "naturalNumber")
            fieldSchema = z.number({
                required_error: errorMessage.number_invalid,
                invalid_type_error: errorMessage.number_invalid
            })

        if (!field.Is_Required)
            fieldSchema = fieldSchema?.optional()


        return {[field.Name]: fieldSchema};
    });

    return z.object(Object.assign({}, ...fieldSchemas))
}

export default Index;