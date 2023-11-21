import React, {useContext} from 'react'
import StepContext from '../../stete-manager/step-context';
import useGetForm from "../../../../../../../components/FormBuilder/hooks/useGetForm";
import {Typography} from "antd/lib";
import {Button, Divider} from "antd";
import {ChevronLeftIcon} from "@heroicons/react/24/outline";
import {formsUid} from "../../../../../../../Constants/formsUid";
import useSetForm from "../../../../../../../components/FormBuilder/hooks/useSetForm";
import Resource from "../../../../../../../components/Resource";

export default function Index() {

    const processController = useContext(StepContext);

    const formData = useGetForm(formsUid.mix_blending_tank_information)

    const setForm = useSetForm(formsUid.mix_blending_tank_information)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        اطلاعات مخازن میکس یا بلندینگ ( 1 از 8 )
                    </Typography>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Button
                        className="bg-gray-50 flex items-center justify-center"
                        size="large"
                        type="default"
                        htmlType="submit"
                        onClick={() => processController.dispatch({type: "NEXT", stepNumber: 7})}
                    >
                        <span className="flex">
                            صفحه بعد
                        </span>
                        <ChevronLeftIcon width={24} height={24}/>
                    </Button>
                </div>
            </div>
            <Divider/>
            <Resource items={formData.data} onSet={setForm.onSet} loading={formData.isLoading}/>
        </>
    )
}
