import React from 'react';
import {Spin} from "antd";


const Index = (props: { loading?: boolean, data?: any }) => {

    // const form = useGetDoc2({
    //     form_Key: props.form_Key,
    //     package_Uid: props.package_Uid,
    //     uid: props.uid
    // })

    if (props.loading) {
        return <Spin/>
    }

    // if (!props.loading && !Array.isArray(form.data?.header)) {
    //     return <Empty/>
    // }

    // const columns: ColumnType<any>[] = []

    // form.data?.header?.map((item) => {
    //     if (!item.hidden) columns.push({dataIndex: item.key, title: item.value})
    // })

    // return <Table columns={columns} dataSource={form.data?.values}/>
    return <></>
};

export default Index;