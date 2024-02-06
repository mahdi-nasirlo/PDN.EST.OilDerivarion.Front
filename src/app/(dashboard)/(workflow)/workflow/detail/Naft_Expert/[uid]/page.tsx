"use client";

import React from "react";
import {Alert} from "antd";
import {EstForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/est-form";
import {SamtForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/samt-form";
import {NaftForm} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/naft-form";
import CommonWorkflow from "@/app/(dashboard)/(workflow)/workflow/detail/[key]/[uid]/component/common-workflow";

export default function Page({params}: { params: { uid: string } }) {

    return (
        <>
            <CommonWorkflow uid={params.uid} stepKey={"Naft_Expert"}>
                <Alert
                    className="text-blue-800 text-right"
                    message="لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را انتخاب نمایید."
                    type="info"
                />
                <NaftForm disable={false} uid={params.uid}/>
                <SamtForm disable={true}/>
                <EstForm disable={true}/>
            </CommonWorkflow>
        </>
    );
}
