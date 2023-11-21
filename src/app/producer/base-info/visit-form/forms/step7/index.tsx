import {Divider, Typography} from 'antd'
import React, {useState} from 'react'
import useGetForm from "../../../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../../../Constants/formsUid";
import Resource from "../../../../../../../components/Resource";
import useSetForm from "../../../../../../../components/FormBuilder/hooks/useSetForm";
import DisplayButton from "@/app/producer/base-info/visit-form/forms/step7/components/display-form/display-button";

export default function Index() {

    const [isEditVisible, setIsEditVisible] = useState(true);

    const formData = useGetForm(formsUid.sweetening)

    const setForm = useSetForm(formsUid.sweetening)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        شیرین سازی ( 7 از 8 )
                    </Typography>
                </div>
                {isEditVisible && <DisplayButton setIsEditVisible={setIsEditVisible}/>}
            </div>
            <Divider/>
            <Resource items={formData.data as any} loading={formData.isLoading} onSet={setForm.onSet}/>
        </>
    )
}
