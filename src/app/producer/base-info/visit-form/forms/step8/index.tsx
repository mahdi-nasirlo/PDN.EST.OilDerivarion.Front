import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button, Divider, Form, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import StepContext from '../../stete-manager/step-context';
import { useForm } from 'antd/es/form/Form';
import DisplayButton from './components/display-form/display-button';
import EditButton from './components/edit-form/edit-button';
import DisplayForm from './components/display-form/display-form';
import EditForm from './components/edit-form/edit-form';

export default function Index() {

    const processController = useContext(StepContext);
    const [form] = useForm();
    const [isEditVisible, setIsEditVisible] = useState(true);

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات اتاق کنترل</Typography>
                    <Typography className='text-secondary-500'>
                        تجهیزات اتاق کنترل ( 8 از 8 )
                    </Typography>
                </div>
                {isEditVisible && <DisplayButton setIsEditVisible={setIsEditVisible} />}
                {!isEditVisible &&
                    <EditButton
                        form={form}
                        // mutate={mutate}
                        // isMutating={isMutating}
                        setIsEditVisible={setIsEditVisible}
                    />
                }
            </div >
            <Divider />
            {isEditVisible &&
                <Form form={form} layout='vertical' disabled>
                    <DisplayForm />
                </Form>}
            {!isEditVisible &&
                // <Spin spinning={isMutating || ldProducerLab}>
                <Form layout="vertical" form={form}
                // onFinish={onSubmitFinish}
                >
                    <EditForm />
                </Form>
                // </Spin >
            }
        </>
    )
}
