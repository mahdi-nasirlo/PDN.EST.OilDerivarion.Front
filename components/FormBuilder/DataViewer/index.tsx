import React from 'react';
import {Descriptions, Divider, Typography} from "antd";
import {z} from "zod";
import {FormSchemaStructure} from "../type";
import FormDataTable from "../../Resource/FormDataTable";
import {DescriptionsItemProps} from "antd/lib/descriptions/Item";


const Index = ({data}: { data: any }) => {

    let parsData: any
    try {
        parsData = JSON.parse(data)
    } catch (e) {
        parsData = {}
    }
console.log("parsData",parsData);


    let view: any[] = []
    Object?.keys(parsData).forEach((key) => {

        let item: any

        try {

            item = parsData[key]

            const schemaSearch = z.object({
                jsonVersion: z.number(),
                json: z.string()
            }).safeParse(item)

            if (schemaSearch.success) {

                const schemaJson = JSON.parse(schemaSearch.data.json as any)

                const schemaJsonValidate = FormSchemaStructure.safeParse(schemaJson)

                if (!schemaJsonValidate.success) {
                    view.push("schema وجود دارد ولی معتبر نیست")
                    console.error(schemaJsonValidate.error)
                    return
                }

                const schema = schemaJsonValidate.data

                schema.map((categoryForms, index) => {


                    categoryForms.Forms.map((Form, index1) => {

                        // @ts-ignore
                        let schemaValue = parsData[`${Form.Form_Key}`] || null

                        let tabItem

                        if (Form.Mode === 1) {
                            const descriptionsItems: DescriptionsItemProps[] = []


                            Form.FormFields?.map((FormField, index3) => {
                                descriptionsItems.push({
                                    label: FormField.Title_Style,
                                    children: schemaValue[FormField.Name]
                                })
                            })

                            tabItem = <Descriptions className="text-right" title={Form.Title}>
                                {descriptionsItems.map((descriptionsItem, index3) => <>
                                    <Descriptions.Item label={descriptionsItem.label}>
                                        {descriptionsItem.children}
                                    </Descriptions.Item>
                                </>)}
                            </Descriptions>
                        }

                        if (Form.Mode === 0) {
                            tabItem = <div>
                                <Typography className="text-right font-bold text-lg mb-5">
                                    {categoryForms.Title}
                                </Typography>
                                <div>
                                    <FormDataTable schema={Form as any} records={schemaValue} delete={false}/>
                                </div>
                                {index1 + 1 !== categoryForms.Forms.length && categoryForms.Forms.length > 1 &&
                                    <Divider className="my-2"/>}
                            </div>

                        }

                        view.push(<>
                            {tabItem}
                        </>)

                    })

                })
            } else {
                return;
            }

        } catch (e) {
            console.error(e)
        }

    });

    return <>
        {/*<Tabs*/}
        {/*    size="large"*/}
        {/*    type="card"*/}
        {/*>*/}
        {view?.map((value, index) => value)}
        {/*</Tabs>*/}
    </>
};

export default Index;