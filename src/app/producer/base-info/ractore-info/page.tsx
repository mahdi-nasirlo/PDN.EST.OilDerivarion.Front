"use client";

import {Divider, Typography} from 'antd'
import React, {useState} from 'react'
import {formsUid} from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";

export default function Page() {

    const [isEditVisible, setIsEditVisible] = useState(true)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات راکتور
                    </Typography>
                </div>

            </div>
            <Divider/>
            <Resource categoryID={formsUid.reactor_specifications}/>
        </>
    )
}
