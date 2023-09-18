"use client";
import {Divider, Typography} from "antd";
import React from "react";
import PrimaryProductForm from "./components/primary-product-form";


export default function Page() {

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                محصول تولیدی
            </Typography>
            <PrimaryProductForm/>
        </>
    );
}

