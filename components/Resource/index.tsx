import React from 'react';
import {Spin, Typography} from "antd";
import FormBuilder, {FormSchemaType} from "../FormBuilder";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";
import FormDataTable from "./FormDataTable";
import useFormRequest from "../FormBuilder/hooks/useFormRequest";
import FormBuilderProvider from "../FormBuilder/provider/FormBuilderProvider";


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

    if (type === "single") {

        return

    }

    if (type === "many") {


        return schema?.Forms?.map((value, index) => {
            console.log(records)
            return <>
                <FormBuilder key={index} item={value} title={true}
                             onSet={formProvider.onSetMany}/>
                <div className="mt-8">
                    <FormDataTable schema={value} records={records}/>
                </div>
            </>
        })
    }

}

export default Index;