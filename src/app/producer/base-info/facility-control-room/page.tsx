"use client";
import {Divider, Typography} from 'antd'
import React from 'react'
import Resource from "../../../../../components/Resource";
import {formsUid} from "../../../../../Constants/formsUid";

export default function Page() {

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات اتاق کنترل</Typography>
                    <Typography className='text-secondary-500'>
                        تجهیزات اتاق کنترل
                    </Typography>
                </div>
            </div>
            <Divider/>
            <Resource categoryID={formsUid.control_room_equipment}/>
        </>
    )
}
