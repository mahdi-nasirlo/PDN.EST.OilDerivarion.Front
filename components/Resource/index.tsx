import React from 'react';
import {Divider, Spin, Typography} from "antd";
import FormBuilder, {FormSchemaType} from "../FormBuilder";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";
import useFormRequest from "../FormBuilder/hooks/useFormRequest";
import FormDataTable from "./FormDataTable";
import FormBuilderProvider from "../FormBuilder/provider/FormBuilderProvider";


const Index = ({ categoryID, type = "single" }: { categoryID: string, type?: "many" | "single", }) => {

    const formData = useFormRequest(categoryID)

    try {

        if (formData.isLoading) return <Spin spinning={formData.isLoading} />

        if (
            formData.data === undefined ||
            formData.data === null ||
            formData.data.schema === null
        ) return <Typography>دیتایی وجود ندارد</Typography>

        let schema: FormSchemaType[] = JSON.parse(formData.data.schema.json)

        if (!schema[0]) return <Typography>form maker error</Typography>

        const records = JSON.parse(formData.data.records)

        return (
            <>
                <FormBuilderProvider initialValues={records} type={type} formData={formData}>
                    <Spin spinning={formData.isLoading}>
                        <RenderForms schema={schema[0]} records={records} type="many"/>
                    </Spin>
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

const RenderForms = ({ schema, records, type = "single", loading = false, title = false }: ComponentProps) => {

    const formProvider = useControlFormBuilder()

    return schema?.Forms?.map((Form, index) => {

        let initialValues

        if (records && Form?.Form_Key && Form.Form_Key in records) {
            initialValues = records[Form.Form_Key]
        }

        if (Form?.Mode === 0) {

            return <>
                <FormBuilder key={index} item={Form} title={true}
                    onSet={formProvider.onSetMany} />
                <div className="mt-8">
                    <FormDataTable schema={Form} records={initialValues} delete={true} />
                </div>
                {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
                    <Divider style={{ margin: "50px 0" }} />}
            </>
        }

        if (Form.Mode === 1) {

            return <>
                <FormBuilder
                    key={index}
                    item={Form}
                    title={true}
                    onSet={formProvider.onSetOne}
                    initialValues={initialValues}
                />
                {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
                    <Divider style={{ margin: "30px 0" }} />}
            </>
        }

        return <Typography key={index}>form mode is not detected</Typography>
    })

}

export default Index;