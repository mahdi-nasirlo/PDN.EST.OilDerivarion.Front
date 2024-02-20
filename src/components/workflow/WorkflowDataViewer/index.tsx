import React from 'react';
import {formMakerApi} from "../../../constance/form-maker";
import {Card} from "@/components/card";
import {ZodErrorAlert} from "@/components/zod-error-alert";
import {Empty} from "antd";
import {Descriptions} from "antd/lib";

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

        for (let key in validateData.data.Table.Values) {

            const column = cardData.Table.Header.find((item) => item.Key = key)

            const value = cardData?.Table?.Values?.[key]

            if (!column?.Hidden) view.push(<Descriptions.Item
                span={typeof value == "string" ? Math.round(value.length / 18) : 6}
                label={column?.Value}
            >
                {value}
            </Descriptions.Item>)

        }

        return view
    }

    return <Card className="bg-gray-50">
        <Descriptions className="text-right text-secondary-500" column={6} title={validateData.data.Title}>
            {renderCard()}
        </Descriptions>
    </Card>
};

export default Index;