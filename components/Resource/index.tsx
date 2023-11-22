import React from 'react';
import {Spin, Typography} from "antd";
import FormBuilder, {FormSchemaType} from "../FormBuilder";
import FormBuilderProvider from "../FormBuilder/provider/FormBuilderProvider";


interface PropsType {
    items: {
        schema: {
            jsonVersion: number,
            json: string
        },
        records?: any
    } | undefined | null
    loading?: boolean,
    type?: "many" | "single",
    onSet: (data: any) => void,
}

const Index = ({loading = false, items, type = "single", onSet}: PropsType) => {

    if (loading) {
        return <Spin/>
    }

    try {

        if (items === undefined || items === null || items.schema === null) return <Typography>دیتایی وجود
            ندارد</Typography>

        let schema: FormSchemaType[] = JSON.parse(items.schema.json)

        if (!schema[0]) return <Typography>form maker error</Typography>

        const records = JSON.parse(items.records)

        return (
            <>
                <FormBuilderProvider onSubmit={onSet} initialValues={records}>
                    <FormBuilder items={schema} loading={loading} title={false}/>
                </FormBuilderProvider>
            </>
        );
    } catch (e) {

        return <Typography>json structure is changed</Typography>

    }
};

export default Index;