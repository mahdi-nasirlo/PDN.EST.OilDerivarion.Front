"use client"

import React from 'react';
import {Divider, Spin, Typography} from "antd";
import useFormRequest from "@/components/form-builder/hooks/use-form-request";
import {z} from "zod";
import {formMakerApi} from "../../constance/form-maker";
import useControlFormBuilder from "@/components/form-builder/hooks/use-controle-form-builder";
import {ZodErrorAlert} from "@/components/zod-error-alert";
import FormBuilder from "@/components/form-builder";
import FormDataTable from "@/components/resource/form-data-table";

const Index = ({categoryKey, type = "single"}: { categoryKey?: string, type?: "many" | "single", }) => {

    const {get} = useFormRequest(categoryKey)

    try {

        if (get.isLoading && !get.data) return <Spin spinning={get.isLoading}/>

        if (
            get.data === undefined ||
            get.data === null ||
            get.data.schema === null
        ) return <Typography>دیتایی وجود ندارد</Typography>

        let schemaValue = JSON.parse(get.data.schema.json)

        const validate = get.formSchema.safeParse(schemaValue)

        if (!validate.success) {
            return <ZodErrorAlert success={false} error={validate.error}/>
        }

        const records = get.data.form_Data?.form_data ? JSON.parse(get.data.form_Data?.form_data) : {}

        const validateRecords = get.formData.safeParse(records)


        if (!validateRecords.success) {
            return <ZodErrorAlert success={false} error={validateRecords.error}/>
        }

        return (
            <>
                <Spin spinning={get.isLoading ?? false}>
                    <RenderForms
                        categoryKey={categoryKey as string}
                        schema={validate.data}
                        records={validateRecords.data}
                        type="many"
                    />
                </Spin>
            </>
        );
    } catch (e) {

        return <Typography>json structure is changed</Typography>

    }

};


interface TProps {
    schema: z.infer<typeof formMakerApi.Get.formSchema>,
    records: z.infer<typeof formMakerApi.Get.formData>,
    categoryKey: string,
    loading?: boolean,
    title?: boolean,
    type?: "single" | "many"
}


// {schema, records, type = "single", loading = false, title = false}: ComponentProps
const RenderForms = ({schema, records, categoryKey}: TProps) => {

    const formProvider = useControlFormBuilder(records, categoryKey)

    return schema?.[0]?.Forms?.map(((form, index) => {

        let initialValues

        const formsLen = schema?.[0]?.Forms.length

        const divider = formsLen && formsLen > 1 && index !== formsLen - 1 && <Divider style={{margin: "30px 0"}}/>

        if (records && form?.Form_Key && form.Form_Key in records) {
            initialValues = records[form.Form_Key]
        }

        if (form.Mode === 0) {

            return <>
                <FormBuilder
                    key={index}
                    item={form}
                    title={true}
                    isLoading={formProvider.isLoading}
                    onSet={formProvider.onSetMany}
                />
                <div className="mt-8">
                    <FormDataTable
                        formKey={categoryKey}
                        schema={form}
                        formData={initialValues}
                        delete={true}
                    />
                </div>
                {divider}
            </>
        }

        if (form.Mode === 1) {

            return <>
                <FormBuilder
                    key={index}
                    item={form}
                    initialValues={initialValues}
                    onSet={formProvider.onSetOne}
                />
                {divider}
            </>
        }

        return <Typography>form mode is not detected</Typography>
    }))
    // return schema?.Forms?.map((Form, index) => {
    //
    //     let initialValues
    //
    //     if (records && Form?.Form_Key && Form.Form_Key in records) {
    //         initialValues = records[Form.Form_Key]
    //     }
    //
    //     if (Form?.Mode === 0) {
    //
    //         return <>
    //             <FormBuilder key={index} item={Form} title={true}
    //                          onSet={formProvider.onSetMany}/>
    //             <div className="mt-8">
    //                 <FormDataTable schema={Form} records={initialValues} delete={true}/>
    //             </div>
    //             {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
    //                 <Divider style={{margin: "50px 0"}}/>}
    //         </>
    //     }
    //
    //     if (Form.Mode === 1) {
    //
    //         return <>
    //             <FormBuilder
    //                 key={index}
    //                 item={Form}
    //                 title={true}
    //                 onSet={formProvider.onSetOne}
    //                 initialValues={initialValues}
    //             />
    //             {schema?.Forms?.length > 1 && index !== schema?.Forms?.length - 1 &&
    //                 <Divider style={{margin: "30px 0"}}/>}
    //         </>
    //     }

    // return <Typography>form mode is not detected</Typography>
    // })

}


export default Index;