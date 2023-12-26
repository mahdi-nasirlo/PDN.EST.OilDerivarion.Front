"use client";

import {Divider, Form, Select, Typography} from 'antd'
import React, {useEffect} from 'react'
import {formsUid} from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";
import FormItem from "antd/lib/form/FormItem";
import {useForm} from "antd/lib/form/Form";

export default function Page() {

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات برج تقطیر
                    </Typography>
                </div>
            </div >
            <Divider/>
            <Resource categoryID={formsUid.distillation}/>
        </>
    )
}
