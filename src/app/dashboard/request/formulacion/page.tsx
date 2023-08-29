"use client";

import {Button, Divider, Typography} from "antd";
import React, {useState} from "react";
import PrimaryProductTable from "@/app/dashboard/request/formulacion/components/primary-product-table";
import PrimaryProductForm from "./components/primary-product-form";
import useSWR from "swr";
import {getAllRequestDetailMaterial} from "../../../../../units/RequestDetail/getAllRequestDetailMaterial";
import {useRouter} from "next/navigation";

export default function Formulacion() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const {
        mutate,
        data: requestMasterMaterial,
        isLoading: requestMasterMaterialLoading,
    } = useSWR("/RequestDetail/GetPageMaterial", getAllRequestDetailMaterial);

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary">
                * برای وارد کردن درصد مواد اولیه تمامی اعداد را با حجمی یا وزنی وارد
                نمایید.
            </Typography>

            <Divider/>
            <PrimaryProductForm mute={mutate}/>
            <PrimaryProductTable
                data={requestMasterMaterial}
                loading={requestMasterMaterialLoading}
            />
            <Divider/>
            <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
            >
                <span className="flex gap-2 justify-center ">ذخیره و ادامه</span>
            </Button>
        </>
    );
}

// async function getAllRequestMaster() {
//     const cookieStore = cookies();
//     const requestMasterUid = cookieStore.get("requestMasterUid")?.value;
//
//     return await axios
//         .request({
//             method: "get",
//             url: `${process.env["NEXT_PUBLIC_API_URL"]}/api/RequestDetail/GetPageMaterial`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: {
//                 requestMasterUid: requestMasterUid,
//                 fromRecord: 0,
//                 selectRecord: 20,
//             },
//         })
//         .then((res: any) => res.data.data);
// }
//
// async function getAllMaterial() {
//     return await axios
//         .request({
//             method: "get",
//             url: `${process.env["NEXT_PUBLIC_API_URL"]}/api/Material/GetAll`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             data: {
//                 name: null,
//                 is_Active: true,
//             },
//         })
//         .then((res: any) => res.data.data);
// }
