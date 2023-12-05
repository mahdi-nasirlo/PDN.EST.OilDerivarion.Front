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

                schema.map((value, index) => {


                    value.Forms.map((value1, index1) => {

                        // @ts-ignore
                        let schemaValue = item[value1.Form_Key] || {}

                        let tabItem

                        if (value1.Mode === 1) {
                            const items: DescriptionsItemProps[] = []

                            value1.FormFields?.map((value2, index3) => {
                                items.push({label: value2.Title_Style, children: schemaValue[value2.Name]})
                            })

                            tabItem = <Descriptions className="text-right" title={value1.Title}>
                                {items.map((value2, index3) => <>
                                    <Descriptions.Item label={value2.label}>
                                        {value2.children}
                                    </Descriptions.Item>
                                </>)}
                            </Descriptions>
                        }

                        if (value1.Mode === 0) {

                            tabItem = <div className="my-8">
                                <Typography className="text-right font-bold text-lg mb-5">
                                    {value.Title}
                                </Typography>
                                <div>
                                    <FormDataTable schema={value1 as any} records={item} delete={false}/>
                                </div>
                                {index1 + 1 !== value.Forms.length && value.Forms.length > 1 &&
                                    <Divider className="my-2"/>}
                            </div>

                        }

                        view.push(<>
                            {/*<Tabs.TabPane tab={value1.Title} key={value1.Form_Key}>*/}
                            {tabItem}
                            {/*</Tabs.TabPane>*/}
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