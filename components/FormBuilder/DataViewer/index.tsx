import React from 'react';
import {Descriptions, Divider, Tabs, Typography} from "antd";
import {FormSchemaStructure} from "../type";
import {z} from "zod";
import {DescriptionsItemProps} from "antd/lib/descriptions/Item";
import FormDataTable from "../../Resource/FormDataTable";


const Index = ({data}: { data: any }) => {
    // try {

    let view: any[] = []
    Object.keys(data).forEach((key) => {

        if (typeof data[key] === "string") {

            let item: any

            try {

                item = JSON.parse(data[key])


                const schemaSearch = z.object({
                    __schema: z.object({
                        json: z.string()
                    })
                }).safeParse(item)

                if (schemaSearch.success) {

                    const schemaJson = JSON.parse(schemaSearch.data.__schema.json as any)

                    const schemaJsonValidate = FormSchemaStructure.safeParse(schemaJson)

                    if (!schemaJsonValidate.success) {
                        view.push("schema وجود دارد ولی معتبر نیست")
                        console.error(schemaJsonValidate.error)
                        return
                    }

                    const schema = schemaJsonValidate.data

                    schema.map((value, index) => {

                        value.Forms.map((value1, index1) => {

                            console.log(value1)

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
                                <Tabs.TabPane tab={value1.Title} key={value1.Form_Key}>
                                    {tabItem}
                                </Tabs.TabPane>
                            </>)

                        })

                    })

                } else {
                    return;
                }

            } catch (e) {
                console.error(e)
            }

        }

    });

    return <>
        <Tabs
            size="large"
            type="card"
        >
            {view?.map((value, index) => value)}
        </Tabs>
    </>
};

export default Index;