"use client";


import React from 'react'
import {Typography} from "antd/lib";
import {Divider} from "antd";
import {formsUid} from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";
import useFormRequest from "../../../../../components/FormBuilder/hooks/useFormRequest";

export default function Page() {

    const formData = useFormRequest(formsUid.mix_blending_tank_information)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        اطلاعات مخازن میکس یا بلندینگ
                    </Typography>
                </div>

            </div>
            <Divider/>
            <Resource items={formData.data} onSet={formData.onSet} loading={formData.isLoading}/>
        </>
    )
}
