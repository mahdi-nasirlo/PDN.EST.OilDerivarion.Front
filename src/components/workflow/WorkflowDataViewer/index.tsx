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

        view.push(<Descriptions column={6}>
            {cardData.Model?.map((item, index) => (<Descriptions.Item
                key={index}
                span={typeof item.Value == "string" ? 3 : 6}
                label={item.Key}
            >
                {item.Value}
            </Descriptions.Item>))}
        </Descriptions>)


        cardData.ListTable?.map(item => {

            const columns: TableColumnsType<any> | undefined = item?.Header?.map((column) => ({
                dataIndex: column.Key,
                title: column.Value
            }))

            console.log(columns, item?.Values)
            view.push(<Card className="bg-gray-100">
                <Typography className="text-right text-lg font-semibold">
                    {item?.Title}
                </Typography>
                <div className="w-full">
                    <Table
                        columns={columns}
                        dataSource={item?.Values}
                    />
                </div>
            </Card>)
        })

        for (let key in validateData.data.Table?.Values) {

            const column = cardData.Table?.Header?.find((item) => item.Key == key)

            const value = cardData?.Table?.Values?.[key]

            view.push(<Descriptions
                className="text-right text-secondary-500"
                column={6}
                title={validateData.data.Title}
            >
                {!column?.Hidden && column?.Value && <Descriptions.Item
                    span={6}
                    label={column?.Value}
                >
                    {value}
                </Descriptions.Item>}
            </Descriptions>)

        }

        return view
    }

    return renderCard()
};

export default Index;