"use client"

import React from 'react';
import { Button, Divider, Spin, Typography } from "antd";
import useFormRequest from "@/components/form-builder/hooks/use-form-request";
import { ZodErrorAlert } from "@/components/zod-error-alert";
import { z } from "zod";
import { formMakerApi } from "../../constance/form-maker";
import useControlFormBuilder from "@/components/form-builder/hooks/use-controle-form-builder";
import FormBuilder from "@/components/form-builder";
import FormDataTable from "@/components/resource/form-data-table";
import FormBuilderHistory from "@/components/form-builder/form-builder-history";
import { Card } from "@/components/card";
import Breadcrumb from "@/components/breadcrumb";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { router } from "next/client";

const Index = ({ categoryKey, type = "single" }: { categoryKey?: string, type?: "many" | "single", }) => {

    const { get } = useFormRequest(categoryKey)

    try {

        if (get.isLoading && !get.data) return <Card><Spin spinning={get.isLoading} /></Card>

        if (
            get.data === undefined ||
            get.data === null ||
            get.data.schema === null
        ) return <Typography>دیتایی وجود ندارد</Typography>

        let schemaValue = JSON.parse(get.data.schema.json)

        const validate = get.formSchema.safeParse(schemaValue)

        if (!validate.success) {
            return <ZodErrorAlert success={false} error={validate.error} />
        }

        const records = get.data.form_Data?.form_data ? JSON.parse(get.data.form_Data?.form_data) : {}

        const validateRecords = get.formData.safeParse(records)


        if (!validateRecords.success) {
            return <ZodErrorAlert success={false} error={validateRecords.error} />
        }

        return (
            <>
                <Breadcrumb
                    pages={[{ label: "خانه", path: "/" }]}
                    currentPage={validate.data[0]?.Title as string}
                    titleIcon={<DocumentDuplicateIcon className="w-6" />}
                    actions={[
                        <Button
                            key={1}
                            onClick={() => router.back()}
                            size="large"
                        >
                            بازگشت
                        </Button>
                    ]}
                />
                <FormBuilderHistory formKey={categoryKey as string} />
                <Card>
                    <Spin spinning={get.isLoading ?? false}>
                        <RenderForms
                            loading={get.isLoading}
                            categoryKey={categoryKey as string}
                            schema={validate.data}
                            records={validateRecords.data}
                            type="many"
                        />
                    </Spin>
                </Card>
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
const RenderForms = ({ schema, records, categoryKey, loading }: TProps) => {

    const formProvider = useControlFormBuilder(records, categoryKey)

    return schema?.[0]?.Forms?.map(((form, index) => {

        let initialValues

        const formsLen = schema?.[0]?.Forms.length

        const divider = formsLen && formsLen > 1 && index !== formsLen - 1 && <Divider style={{ margin: "30px 0" }} />

        if (records && form?.Form_Key && form.Form_Key in records) {
            initialValues = records[form.Form_Key]
        }

        if (form.Mode === 0) {

            return <>
                <Spin spinning={formProvider.isLoading}>
                    <FormBuilder
                        key={index}
                        item={form}
                        title={true}
                        isLoading={formProvider.isLoading}
                        onSet={formProvider.onSetMany}
                    />
                </Spin>
                <div className="mt-8">
                    <FormDataTable
                        key={index}
                        isLoading={loading}
                        formKey={categoryKey}
                        schema={form}
                        formData={records}
                        delete={true}
                    />
                </div>
                {divider}
            </>
        }

        if (form.Mode === 1) {

            return <>
                <Spin spinning={formProvider.isLoading}>
                    <FormBuilder
                        key={index}
                        item={form}
                        initialValues={initialValues}
                        onSet={formProvider.onSetOne}
                    />
                </Spin>
                {divider}
            </>
        }

        return <Typography key={index}>form mode is not detected</Typography>
    }))

}


export default Index;