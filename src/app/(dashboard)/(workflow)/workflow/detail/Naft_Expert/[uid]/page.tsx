"use client";

import React from "react";
import {Alert, Divider} from "antd";
import {EstForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/est-form";
import {SamtForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/samt-form";
import {NaftForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/naft-form";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";

export default function Page({params: {uid, key}}: { params: { uid: string, key: string } }) {
    return (
        <>
            <CommonWorkflow uid={uid} key={key}>
                <Alert
                    className="text-blue-800 text-right"
                    message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
                    type="info"
                />
                <Divider/>
                <NaftForm/>
                <SamtForm/>
                <EstForm/>
            </CommonWorkflow>
        </>
    );
}
