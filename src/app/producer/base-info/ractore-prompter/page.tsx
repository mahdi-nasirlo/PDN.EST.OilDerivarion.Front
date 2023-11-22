"use client";


import {Divider, Typography} from 'antd'
import React, {useState} from 'react'
import useGetForm from "../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";
import useSetForm from "../../../../../components/FormBuilder/hooks/useSetForm";


export default function Page() {

    const [isEditVisible, setIsEditVisible] = useState(true);

    const getForm = useGetForm(formsUid.desulfation)

    const setForm = useSetForm(formsUid.desulfation)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        راکتور سولفور زدایی
                    </Typography>
                </div>
            </div >
            <Divider/>
            <Resource items={getForm.data} onSet={setForm.onSet} loading={getForm.isLoading}/>
        </>
    )
}
