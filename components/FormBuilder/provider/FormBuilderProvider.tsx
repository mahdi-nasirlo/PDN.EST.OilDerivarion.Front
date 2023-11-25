import React from 'react';
import {ReturnedTypeFormRequest} from "../hooks/useFormRequest";
import {FormSchemaFormsStructure} from "../type";
import {Alert} from "antd";

export interface FormBuilderType {
    initialValues: any,
    type: "one" | "many",
    formData: ReturnedTypeFormRequest
}

export const FormBuilderContext = React.createContext<FormBuilderType>({} as FormBuilderType)

interface FormBuilderProvider {
    children: React.ReactNode,
    initialValues: any,
    type: "one" | "many",
    formData: ReturnedTypeFormRequest
}

export const FormBuilderProvider = (props: FormBuilderProvider) => {

    try {
        const data = JSON.parse(props.formData?.data?.schema?.json as string)

        const isValidSchema = FormSchemaFormsStructure.safeParse(data)

        if (!isValidSchema.success) console.log(isValidSchema.error)

        return (
            <FormBuilderContext.Provider value={{
                initialValues: props.initialValues,
                type: props.type,
                formData: props.formData
            }}>
                {isValidSchema.success && props.children}
                {!isValidSchema.success &&
                    <Alert className="text-right" type="warning" message="دیتای وارد شده مقایرت دارد"/>
                }
            </FormBuilderContext.Provider>
        );
    } catch (e) {

        return <Alert className="text-right" type="error" message="دیتای وارد شده مقایرت دارد"/>

    }
};

export default FormBuilderProvider;