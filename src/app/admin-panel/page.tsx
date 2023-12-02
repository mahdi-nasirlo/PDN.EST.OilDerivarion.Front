"use client"

import { Typography } from "antd";
import useGetBaseInfo from "../../../hooks/producer/useGetBaseInfo";
import DataViewer from '../../../components/FormBuilder/DataViewer'


export default function Manufacturer() {


    const getInfo = useGetBaseInfo();

    return (
        <div className="box-border w-full mt-8 p-6 text-gray-900">
            <Typography className="text-right text-2xl font-bold">
                پنل ادمین
            </Typography>
            <div className="mt-10">
                <DataViewer data={getInfo.data || {}} />
            </div>
        </div>
    );
}
