"use client";

import {Divider, Typography} from 'antd'
import React, {useContext} from 'react'
import StepContext from '../visit-form/stete-manager/step-context';
import DataTable from '@/app/producer/base-info/container-product/components/data-table';
import useGetForm from "../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../Constants/formsUid";
import useSetForm from "../../../../../components/FormBuilder/hooks/useSetForm";
import Resource from "../../../../../components/Resource";

export default function Page() {

    const processController = useContext(StepContext);

    const formData = useGetForm(formsUid.repository_information)

    const setForm = useSetForm(formsUid.repository_information)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        اطلاعات مخازن محصول
                    </Typography>
                </div>

            </div >
            <Divider/>
            <Resource items={formData.data} onSet={setForm.onSet} loading={formData.isLoading}/>
            <DataTable/>
        </>
    )
}
