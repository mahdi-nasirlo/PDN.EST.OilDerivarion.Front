"use client";

import {Button, Divider, Row, Typography} from "antd";
import React, {useState} from "react";
import PrimaryProductTable from "@/app/dashboard/request/formulacion/components/primary-product-table";
import PrimaryProductForm from "./components/primary-product-form";
import useSWR from "swr";
import {convertKeysToLowerCase} from "../../../../../lib/convertKeysToLowerCase";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {getCookie} from "cookies-next";

export default function Formulacion() {

    const [data, setData] = useState(undefined)

    const {
        mutate,
        data: requestMasterMaterial,
        isLoading: requestMasterMaterialLoading,
    } = useSWR("/RequestDetail/GetPageMaterial", url => listFetcher(url, {arg: {requestMasterUid: getCookie("requestMasterUid")}}));

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
            <PrimaryProductForm mute={mutate} setData={setData} data={convertKeysToLowerCase(data)}/>
            <PrimaryProductTable
                setData={setData}
                mute={mutate}
                data={requestMasterMaterial}
                loading={requestMasterMaterialLoading}
            />
            <Row>
                <Divider/>
                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                >
                    <span className="flex gap-2 justify-center ">ذخیره و ادامه</span>
                </Button>
            </Row>
        </>
    );
}
