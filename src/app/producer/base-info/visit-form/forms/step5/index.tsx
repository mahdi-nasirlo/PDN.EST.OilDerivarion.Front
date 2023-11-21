import {Divider, Typography} from 'antd'
import React, {useState} from 'react'
import ButtonDisplay from './components/display-form/button-display';
import useGetForm from "../../../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../../../Constants/formsUid";
import useSetForm from "../../../../../../../components/FormBuilder/hooks/useSetForm";
import Resource from "../../../../../../../components/Resource";

export default function Index() {

    const [isEditVisible, setIsEditVisible] = useState(true)

    const getForm = useGetForm(formsUid.distillation)

    const setForm = useSetForm(formsUid.distillation)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات برج تقطیر ( 5 از 8 )
                    </Typography>
                </div>
                {isEditVisible && <ButtonDisplay setIsEditVisible={setIsEditVisible} />}
            </div >
            <Divider/>
            <Resource items={getForm.data} onSet={setForm.onSet} loading={getForm.isLoading}/>
        </>
    )
}
