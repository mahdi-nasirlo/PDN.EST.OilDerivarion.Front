import React from 'react';
import {Descriptions, Divider} from "antd";
import {formMakerApi} from "../../../constance/form-maker";
import {ZodErrorAlert} from "@/components/zod-error-alert";
import {DescriptionsItemProps} from "antd/lib/descriptions/Item";
import FormDataTable from "@/components/resource/form-data-table";


const Index = ({data, schema}: { data: string, schema: string }) => {

    const {validateSchema, validateData} = prepareData(data, schema)

    if (!validateData.success)
        return <ZodErrorAlert success={false} error={validateData.error}/>

    console.log(validateSchema)
    if (!validateSchema.success)
        return <ZodErrorAlert success={false} error={validateSchema.error}/>

    const {data: formData} = validateData
    const {data: schemaData} = validateSchema

    let view: any[] = []

    Object?.keys(formData).forEach((key) => {

        try {

            const categoryForm = schemaData[0]

            categoryForm?.Forms.map((form, index) => {


                if (form.Mode == 1) {

                    const descriptionsItems: DescriptionsItemProps[] = []

                    form.FormFields?.map((FormField, index3) => {
                        descriptionsItems.push({
                            label: FormField.Title_Style,
                            children: formData[`${form.Form_Key}`][FormField.Name]
                        })
                    })

                    view.push(<Descriptions className="text-right">
                        {descriptionsItems.map((descriptionsItem) => <>
                            <Descriptions.Item label={descriptionsItem.label}>
                                {descriptionsItem.children}
                            </Descriptions.Item>
                        </>)}
                    </Descriptions>)

                }

                if (form.Mode === 0) {

                    const formLen = categoryForm?.Forms.length ?? 0

                    view.push(<div>

                        <FormDataTable
                            formKey={form.Form_Key as string}
                            schema={form}
                            formData={formData}
                            delete={false}
                        />

                        {index + 1 !== formLen && formLen > 1 && <Divider className="my-2"/>}
                    </div>)

                }

            })

        } catch (e) {
            console.error(e)
        }

    });


    return view?.map((value, index) => value)

};

export const prepareData = (data: string, schema: string) => {
    let dataValue: any
    let schemaValue: any

    try {
        dataValue = JSON.parse(data)
        schemaValue = JSON.parse(schema).json
        schemaValue = JSON.parse(schemaValue)
    } catch (e) {
        dataValue = {}
        schemaValue = {}
    }

    const validateSchema = formMakerApi.Get.formSchema.safeParse(schemaValue)
    const validateData = formMakerApi.Get.formData.safeParse(dataValue)

    return {validateSchema, validateData}
}

export default Index;