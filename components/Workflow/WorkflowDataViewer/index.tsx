import React from 'react';
import {Empty, Spin} from "antd";
import {z} from "zod";
import {formMakerApi} from "../../../src/constance/form-maker";
import {useGetDoc2} from "@/hooks/form-maker/use-get-doc2";
import {Table} from "antd/lib";
import {ColumnType} from "antd/lib/table";


const Index = (props: z.infer<typeof formMakerApi.GetDoc2.type> & { loading?: boolean }) => {

    const form = useGetDoc2({
        form_Key: props.form_Key,
        package_Uid: props.package_Uid,
        uid: props.uid
    })

    if (props.loading) {
        return <Spin/>
    }

    if (!props.loading && !Array.isArray(form.data?.header)) {
        return <Empty/>
    }
    
    const columns: ColumnType<any>[] = []

    form.data?.header?.map((item) => {
        if (!item.hidden) columns.push({dataIndex: item.key, title: item.value})
    })

    return <Table columns={columns} dataSource={form.data?.values}/>
};

export default Index;