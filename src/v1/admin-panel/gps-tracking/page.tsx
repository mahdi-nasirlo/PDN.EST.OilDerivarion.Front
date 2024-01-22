"use client"

import React from 'react';
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import useGetAllGpsDeviceTracker from "../../../../hooks/requestGps/useGetAllGpsDeviceTracker";

const Page = () => {

    const gpsTracker = useGetAllGpsDeviceTracker()

    const columns: ColumnsType<any> = [
        {
            title: "ID",
            dataIndex: "GpsDeviceId"
        },
        {
            title: "عرض جغرافیایی",
            dataIndex: "Latitude"
        },
        {
            title: "طول جغرافیایی",
            dataIndex: 'Longitude'
        },
        {
            title: "زمان",
            dataIndex: "CreateDate"
        }
    ]

    return (
        <div className="box-border p-6">
            <div className="flex justify-between items-center mb-3">
                <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                    رهگیری GPS
                </Typography>
            </div>
            <Table
                dataSource={gpsTracker?.data}
                loading={gpsTracker.isLoading}
                pagination={{
                    pageSize: 5,
                    style: {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        margin: "16px 0",
                    },
                }}
                columns={columns}
            />
        </div>
    );
};

export default Page;