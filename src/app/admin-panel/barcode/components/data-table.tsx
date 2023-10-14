import {Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import React from "react";
import {RequestMaster} from "../../../../../interfaces/requestMaster";


const columns: ColumnsType<RequestMaster> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1",
    },
    {
        title: 'نام محصول',
        dataIndex: 'SampleTypeName',
        key: '2',
    },
    {
        title: "محل استفاده بارکد",
        dataIndex: "BarcodeUsePlaceTypeName",
        key: "3"
    },
    {
        title: "نوع ظرف",
        dataIndex: "ContainerTypeName",
        key: "4"
    },
    {
        title: "کد دستگاه GPS",
        dataIndex: "GpsDeviceCode",
        key: "5"
    }
];


const DataTable = ({requestMaster, ldRequestMaster}: { requestMaster: RequestMaster[], ldRequestMaster: boolean }) => {

    return (
        <Table
            className="mt-6"
            columns={columns}
            rowKey={"Uid"}
            loading={ldRequestMaster}
            dataSource={requestMaster}
        />
    )
};

export default DataTable;