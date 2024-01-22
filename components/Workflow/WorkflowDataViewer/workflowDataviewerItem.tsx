import React from "react";
import { Descriptions, Spin, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { addIndexToData } from "../../../lib/addIndexToData";

interface PropsType {
  loading?: boolean;
  columns?: ColumnsType<any>
  data: WorkFlowDataViewerItemType;
}

export interface WorkFlowDataViewerItemType {
  Title: string;
  Model: ModelPropsType[] | undefined;
  Table: TablePropsType | undefined;
}

const Index = (props: PropsType) => {
  if (props.loading) {
    return <Spin spinning={props.loading} />;
  }

  return (
    <>
      {/*<Typography className="font-medium text-lg text-primary-500 mb-4 text-right">*/}
      {/*  {props?.data?.Title}*/}
      {/*</Typography>*/}

      {/*// @ts-ignore*/}
      <RenderTable
        extraColumns={props.columns}
        Values={props?.data?.Table?.Values}
        Header={props?.data?.Table?.Header}
      />
      <RenderModel item={props?.data?.Model as ModelPropsType[]} />
    </>
  );
};

interface TablePropsType {
  extraColumns?: ColumnsType<any>;
  Header:
  | {
    Key: string;
    Value: string;
    Hidden?: boolean;
  }[]
  | undefined;
  Values:
  | {
    Name: string;
    Type: string;
  }[]
  | undefined;
}

const RenderTable = (props: TablePropsType) => {
  if (!props.Header) {
    return <></>;
  }

  const columns: ColumnsType<any> = props.Header
    .filter((item) => !item.Hidden)
    .map((item) => ({ dataIndex: item.Key, title: item.Value }))

  if (props.extraColumns) {
    columns.unshift({
      title: "ردیف",
      dataIndex: "Row",
      key: 'Row',
      width: "5%",
    });

    columns.push(...props.extraColumns);
  }


  return (
    <>
      <Table
        columns={columns}
        dataSource={addIndexToData(props.Values)}
        style={{ marginTop: "24px" }}
      />
    </>
  );
};

interface ModelPropsType {
  Key: string;
  Value: string;
}

const RenderModel = (props: { item: ModelPropsType[] }) => {
  return (
    <>
      <Descriptions>
        {props.item?.map((item, index) => (
          <Descriptions.Item key={index} label={item.Key}>
            {item.Value}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </>
  );
};

export default Index;
