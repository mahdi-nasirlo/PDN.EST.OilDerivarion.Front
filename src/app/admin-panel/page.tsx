"use client"

import { Typography } from "antd";
import GodOfDataViewer from '../../../components/GodOfDataViewer';

export default function Manufacturer() {

    return (
        <div className="box-border w-full mt-8 p-6 text-gray-900">
            <Typography className="text-right text-2xl font-bold">
                پنل ادمین
            </Typography>
            <div className="mt-10">
                <GodOfDataViewer />
            </div>
        </div>
    );
}
