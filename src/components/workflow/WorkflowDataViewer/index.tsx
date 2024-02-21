import React from 'react';
import {formMakerApi} from "../../../constance/form-maker";
import {ZodErrorAlert} from "@/components/zod-error-alert";
import {Empty} from "antd";
import {Descriptions, Table, TableColumnsType, Typography} from "antd/lib";
import {Card} from "@/components/card";

interface PropsType {
    data: string,
}

const Index = ({data}: PropsType) => {

    console.log(data)

    const validateData = formMakerApi.ProducerFormsGetDocSchemaByUid.type1Res.safeParse(data)

    if (!data) {
        return <Empty/>
    }

    if (!validateData.success) {
        return <ZodErrorAlert success={false} error={validateData.error}/>
    }

    const renderCard = () => {

        const cardData = validateData.data

        const view: React.ReactNode[] = []


        cardData.map((item) => {

            view.push(<Typography className="mb-5 font-semibold text-lg text-right">{item.Title}</Typography>)

            view.push(<Descriptions column={6}>
                {item.Model?.map((item, index) => (<Descriptions.Item
                    key={index}
                    span={typeof item.Value == "string" ? 3 : 6}
                    label={item.Key}
                >
                    {item.Value}
                </Descriptions.Item>))}
            </Descriptions>)

            item.ListTable?.map(table => {

                const columns: TableColumnsType<any> | undefined = table?.Header?.map((column) => ({
                    dataIndex: column.Key,
                    title: column.Value
                }))

                view.push(<Card className="bg-gray-100">
                    <Typography className="text-right text-lg font-semibold mb-3">
                        {table?.Title}
                    </Typography>
                    <div className="w-full">
                        <Table
                            columns={columns}
                            dataSource={table?.Values}
                        />
                    </div>
                </Card>)

            })

            const desc: React.ReactNode[] = []

            for (let key in item.Table?.Values) {

                const column = item.Table?.Header?.find((item) => item.Key == key)

                const value = item.Table?.Values?.[key]

                desc.push(<Descriptions.Item
                    span={6}
                    label={column?.Value}
                >
                    {value}
                </Descriptions.Item>)

            }

            view.push(<Card className="bg-gray-100">
                <Descriptions
                    className="text-right text-secondary-500"
                    column={6}
                    title={item.Title}>
                    {desc}
                </Descriptions>
            </Card>)

        })

        return view
    }

    return renderCard()
};

export default Index;