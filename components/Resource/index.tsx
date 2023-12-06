import React from 'react';
import {Divider, Spin, Typography} from "antd";
import FormBuilder, {FormSchemaType} from "../FormBuilder";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";
import useFormRequest from "../FormBuilder/hooks/useFormRequest";
import FormBuilderProvider from "../FormBuilder/provider/FormBuilderProvider";
import FormDataTable from "./FormDataTable";


const Index = ({categoryID, type = "single"}: { categoryID: string, type?: "many" | "single", }) => {

    const formData = useFormRequest(categoryID)

    if (formData.isLoading) {
        return <Spin/>
    }

    try {

        if (formData.data === undefined || formData.data === null || formData.data.schema === null) return <Typography>دیتایی
            وجود
            ندارد</Typography>

        let schema: FormSchemaType[] = JSON.parse(formData.data.schema.json)

        if (!schema[0]) return <Typography>form maker error</Typography>

        const records = JSON.parse(formData.data.records)

        return (
            <>
                <FormBuilderProvider initialValues={records} type={type} formData={formData}>
                    <RenderForms schema={schema[0]} records={records} type="many"/>
                </FormBuilderProvider>
            </>
        );
    } catch (e) {

        return <Typography>json structure is changed</Typography>

    }
};


interface ComponentProps {
    schema: FormSchemaType,
    records: any,
    loading?: boolean,
    title?: boolean,
    type?: "single" | "many"
}

const RenderForms = ({schema, records, type = "single", loading = false, title = false}: ComponentProps) => {

    const formProvider = useControlFormBuilder()

    return schema?.Forms?.map((Form, index) => {

        const mainRecords = records[`${Form.Form_Key}`]

        if (Form?.Mode === 0) {
            return <>
                <FormBuilder key={index} item={Form} title={true}
                             onSet={formProvider.onSetMany}/>
                <div className="mt-8">
                    <FormDataTable schema={Form} records={mainRecords} delete={true}/>
                </div>
                {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
                    <Divider style={{margin: "50px 0"}}/>}
            </>
        }

        if (Form.Mode === 1) {

            let initialValues

            if (Form.Form_Key in records) {
                initialValues = records[Form.Form_Key]
            }


            return <>
                <FormBuilder
                    key={index}
                    item={Form}
                    title={true}
                    onSet={formProvider.onSetOne}
                    initialValues={initialValues}
                />
                {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
                    <Divider style={{margin: "30px 0"}}/>}
            </>
        }

        return <Typography key={index}>form mode is not detected</Typography>
    })

}

export default Index;