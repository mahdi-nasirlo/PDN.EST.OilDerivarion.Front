"use client";


import React from 'react'
import {Typography} from "antd/lib";
import {Divider} from "antd";
import {formsUid} from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";

export default function Page() {

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
            <Resource categoryID={formsUid.mix_blending_tank_information}/>
        </>
    )
}
