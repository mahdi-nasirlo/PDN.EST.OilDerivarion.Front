"use client";

import {Divider, Typography} from 'antd'
import React, {useState} from 'react'
import useGetForm from "../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../Constants/formsUid";
import useSetForm from "../../../../../components/FormBuilder/hooks/useSetForm";
import Resource from "../../../../../components/Resource";

export default function Page() {

    const [isEditVisible, setIsEditVisible] = useState(true)

    const formData = useGetForm(formsUid.reactor_specifications)

    const setForm = useSetForm(formsUid.reactor_specifications)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات راکتور
                    </Typography>
                </div>
                <div className='max-md:w-full'>
                    {/*{isEditVisible && <ButtonDisplay setIsEditVisible={setIsEditVisible}/>}*/}
                </div>
            </div>
            <Divider/>
            <Resource items={formData.data} onSet={setForm.onSet} loading={formData.isLoading}/>
        </>
    )
}
