import { Button, Divider, Form, Typography } from 'antd'
import React, { useState } from 'react'
import DisplayButton from './components/display-form/display-button';
import EditButton from './components/edit-form/edit-button';
import { useForm } from 'antd/es/form/Form';
import DisplayForm from './components/display-form/display-form';
import EditForm from './components/edit-form/edit-form';

export default function Index() {

    const [isEditVisible, setIsEditVisible] = useState(true);
    const [form] = useForm();

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        شیرین سازی ( 7 از 8 )
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
