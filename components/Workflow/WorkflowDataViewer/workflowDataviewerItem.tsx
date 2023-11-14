import React from 'react';
import {Descriptions, Spin, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";

interface PropsType {
    loading?: boolean,
    data: WorkFlowDataViewerItemType
}

export interface WorkFlowDataViewerItemType {
    title: string,
    model: ModelPropsType[] | undefined,
    table: TablePropsType | undefined
}

const Index = (props: PropsType) => {

    if (props.loading) {
        return <Spin spinning={props.loading}/>
    }

    return (
        <>
            <Typography className="font-medium text-lg text-primary-500 mb-4 text-right">
                {props?.data?.title}
            </Typography>

            <RenderTable values={props?.data?.table?.values} header={props?.data?.table?.header}/>
            <RenderModel item={props.data.model as ModelPropsType[]}/>
        </>
    );
};


interface TablePropsType {
    header: {
        key: string,
        value: string
    }[] | undefined,
    values: {
        Name: string,
        Type: string
    }[] | undefined
}

const RenderTable = (props: TablePropsType) => {

    if (!props.header) {
        return <></>
    }

    const columns: ColumnsType<any> = props.header.map(item => ({dataIndex: item.key, title: item.value}))

    return <>
        <Table columns={columns} dataSource={props.values}/>
    </>
}

interface ModelPropsType {
    key: string,
    value: string
}

const RenderModel = (props: { item: ModelPropsType[] }) => {

    return <>
        <Descriptions>
            {props.item?.map((item, index) => <Descriptions.Item key={index} label={item.key}>
                {item.value}
            </Descriptions.Item>)}
        </Descriptions>
    </>
}

export default Index;