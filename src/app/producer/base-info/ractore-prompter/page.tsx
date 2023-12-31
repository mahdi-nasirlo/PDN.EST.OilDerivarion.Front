"use client";


import { Divider, Typography } from 'antd'
import React from 'react'
import { formsUid } from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";


export default function Page() {


    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        تجهیزات شیرین سازی
                    </Typography>
                </div>
            </div >
            <Divider />
            <Resource categoryID={formsUid.desulfation} />
        </>
    )
}
