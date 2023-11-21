import {ChevronDoubleLeftIcon, ChevronDoubleRightIcon} from '@heroicons/react/24/outline'
import {Button, Divider, Typography} from 'antd'
import React, {useContext} from 'react'
import StepContext from '../../stete-manager/step-context';
import DataTable from './components/data-table';
import Resource from "../../../../../../../components/Resource";
import useSetForm from "../../../../../../../components/FormBuilder/hooks/useSetForm";
import useGetForm from "../../../../../../../components/FormBuilder/hooks/useGetForm";
import {formsUid} from "../../../../../../../Constants/formsUid";

export default function Index() {

    const processController = useContext(StepContext);

    const setForm = useSetForm(formsUid.cutting_production_line)

    const getForm = useGetForm(formsUid.cutting_production_line)

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        خط تولید برش گیری ( 4 از 8 )
                    </Typography>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Button
                        className="bg-gray-50 flex items-center justify-center"
                        size="large"
                        type="default"
                        htmlType="submit"
                        icon={<ChevronDoubleRightIcon width={24} height={24} />}
                        onClick={() => processController.dispatch({ type: "PREVIOUS" })}
                    >
                        صفحه قبل
                    </Button>
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
                        <ChevronDoubleLeftIcon width={24} height={24}/>
                    </Button>
                </div>
            </div>
            <Divider/>
            <Resource items={getForm.data} onSet={setForm.onSet} loading={getForm.isLoading}/>
            <DataTable/>
        </>
    )
}
