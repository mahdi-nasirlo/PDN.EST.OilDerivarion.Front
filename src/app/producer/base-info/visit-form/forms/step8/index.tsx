import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button, Divider, Form, Typography } from 'antd'
import React, { useContext } from 'react'
import StepContext from '../../stete-manager/step-context';
import { useForm } from 'antd/es/form/Form';

export default function Index() {

    const processController = useContext(StepContext);
    const [form] = useForm();

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات اتاق کنترل</Typography>
                    <Typography className='text-secondary-500'>
                        تجهیزات اتاق کنترل ( 8 از 8 )
                    </Typography>
                </div>
                <div className='flex gap-3 justify-end'>
                    <Button
                        className="flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        icon={<PencilSquareIcon width={24} height={24} />}
                    // onClick={showModal}
                    >
                        ویرایش
                    </Button>
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
                </div>
            </div >
            <Divider />
            <Form form={form}>
                مرحله 8
            </Form>        </>
    )
}
