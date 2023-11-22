"use client";

import {Divider, Typography} from 'antd'
import React, {useContext} from 'react'
import StepContext from '../visit-form/stete-manager/step-context';
import DataTable from '@/app/producer/base-info/slice-produce/components/data-table';
import Resource from "../../../../../components/Resource";
import useSetForm from "../../../../../components/FormBuilder/hooks/useSetForm";
import useGetForm from "../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../Constants/formsUid";

export default function Page() {

    const processController = useContext(StepContext);

    const setForm = useSetForm(formsUid.cutting_production_line)

    const getForm = useGetForm(formsUid.cutting_production_line)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        خط تولید برش گیری
                    </Typography>
                </div>

            </div>
            <Divider/>
            <Resource items={getForm.data} onSet={setForm.onSet} loading={getForm.isLoading}/>
            <DataTable/>
        </>
    )
}
