import { Button, Divider, Form, Typography } from 'antd'
import React, { useContext } from 'react'
import StepContext from '../../stete-manager/step-context';
import { useForm } from 'antd/es/form/Form';
import CreateForm from './components/create-form';

export default function Index() {

    const processController = useContext(StepContext);
    const [form] = useForm();

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات برج تقطیر ( 5 از 8 )
                    </Typography>
                </div>
            </div >
            <Divider />
            <Form form={form} layout='vertical'>
                <CreateForm />
            </Form>
            <Divider />
            <div className='flex gap-3'>
                <Button
                    className="w-full bg-gray-100"
                    size="large"
                    type="dashed"
                    htmlType="submit"
                    onClick={() => processController.dispatch({ type: "PREVIOUS" })}
                >
                    مرحله قبلی
                </Button>
                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() =>
                        processController.dispatch({ type: "NEXT", stepNumber: 7 })
                    }
                >
                    مرحله بعد
                </Button>
            </div>
        </>
    )
}

