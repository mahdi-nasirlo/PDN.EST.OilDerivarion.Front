import { Button, Divider, Form, Typography } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'antd/es/form/Form';
import ButtonDisplay from './components/display-form/button-display';
import ButtonEdit from './components/edit-form/button-edit';
import FormDisplay from './components/display-form/form-display';
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
                        راکتور سولفور زدایی ( 6 از 8 )
                    </Typography>
                </div>
                {isEditVisible && <ButtonDisplay setIsEditVisible={setIsEditVisible} />}
                {!isEditVisible &&
                    <ButtonEdit
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
                    <FormDisplay />
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
