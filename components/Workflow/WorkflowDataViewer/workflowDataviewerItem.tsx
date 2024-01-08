import React from 'react';
import {Descriptions, Spin, Table, Typography} from "antd";
import {ColumnsType} from "antd/es/table";

interface PropsType {
    loading?: boolean,
    columns?: ColumnsType<any>
    data: WorkFlowDataViewerItemType
}

export interface WorkFlowDataViewerItemType {
    Title: string,
    Model: ModelPropsType[] | undefined,
    Table: TablePropsType | undefined
}

const Index = (props: PropsType) => {


    if (props.loading) {
        return <Spin spinning={props.loading}/>
    }

    return (
        <>
            <Typography className="font-medium text-lg text-primary-500 mb-4 text-right">
                {props?.data?.Title}
            </Typography>

            {/*// @ts-ignore*/}
            <RenderTable extraColumns={props.columns} values={props?.data?.Table?.Values} header={props?.data?.Table?.Header}/>
            <RenderModel item={props?.data?.Model as ModelPropsType[]}/>
        </>
    );
};


interface TablePropsType {
    extraColumns: ColumnsType<any>
    header: {
        Key: string,
        Value: string,
        Hidden?: boolean
    }[] | undefined,
    values: {
        Name: string,
        Type: string,
    }[] | undefined
}

const RenderTable = (props: TablePropsType) => {

    if (!props.header) {
        return <></>
    }

    const columns: ColumnsType<any> = props.header
        .filter(item => !item.Hidden)
        .map(item => ({dataIndex: item.Key, title: item.Value}))

    if (props.extraColumns)
        columns.push(...props?.extraColumns)

    return <>
        <Table columns={columns} dataSource={props.values}/>
    </>
}

interface ModelPropsType {
    Key: string,
    Value: string
}

const RenderModel = (props: { item: ModelPropsType[] }) => {

    return <>
        <Descriptions>
            {props.item?.map((item, index) => <Descriptions.Item key={index} label={item.Key}>
                {item.Value}
            </Descriptions.Item>)}
        </Descriptions>
    </>
}

export default Index;