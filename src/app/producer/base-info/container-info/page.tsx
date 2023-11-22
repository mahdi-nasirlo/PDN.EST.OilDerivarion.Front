"use client";


import React, {useContext} from 'react'
import StepContext from '../visit-form/stete-manager/step-context';
import useGetForm from "../../../../../components/FormBuilder/hooks/useGetForm";
import {Typography} from "antd/lib";
import {Divider} from "antd";
import {formsUid} from "../../../../../Constants/formsUid";
import useSetForm from "../../../../../components/FormBuilder/hooks/useSetForm";
import Resource from "../../../../../components/Resource";

export default function Page() {

    const processController = useContext(StepContext);

    const formData = useGetForm(formsUid.mix_blending_tank_information)

    const setForm = useSetForm(formsUid.mix_blending_tank_information)

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
            <Resource items={formData.data} onSet={setForm.onSet} loading={formData.isLoading}/>
        </>
    )
}
