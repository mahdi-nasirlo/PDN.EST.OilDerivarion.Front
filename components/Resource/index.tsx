import React from 'react';
import {Spin, Typography} from "antd";
import FormBuilder, {FormSchemaType} from "../FormBuilder";


interface PropsType {
    items: {
        schema: {
            jsonVersion: number,
            json: string
        },
        records?: any
    } | undefined | null
    loading?: boolean,
    type?: "many" | "single"
}

const Index = ({loading = false, items, type = "single"}: PropsType) => {

    if (loading) {
        return <Spin/>
    }

    try {

        if (items === undefined || items === null || items.schema === null) return <Typography>دیتایی وجود
            ندارد</Typography>

        let schema: FormSchemaType[] = JSON.parse(items.schema.json)

        if (!schema[0]) return <Typography>form maker error</Typography>

        return (
            <>
                <FormBuilder items={schema} loading={loading} title={true}/>
            </>
        );
    } catch (e) {

        return <Typography>json structure is changed</Typography>

    }
};

export default Index;