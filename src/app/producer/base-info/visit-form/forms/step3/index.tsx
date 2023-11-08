import { Button, Divider, Form, Spin, Typography } from 'antd'
import React, { useState } from 'react'
import { useForm } from 'antd/es/form/Form';
import ReactorSpecifications from './components/display-form/reactor-specifications';
import ReactorPart from './components/display-form/reactor-part';
import ButtonDisplay from './components/display-form/button-display';
import ButtonEdit from './components/edit-form/button-edit';
import ReactorPartEdit from './components/edit-form/reactor-part-edit';
import ReactorSpecificationsEdit from './components/edit-form/reactor-specifications-edit';

export default function Index() {

    const [form] = useForm();

    const [isEditVisible, setIsEditVisible] = useState(true)


    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید</Typography>
                    <Typography className='text-secondary-500'>
                        مشخصات راکتور ( 3 از 8 )
                    </Typography>
                </div>
                <div className='max-md:w-full'>
                    {isEditVisible && <ButtonDisplay setIsEditVisible={setIsEditVisible} />}
                    {!isEditVisible &&
                        <ButtonEdit
                            form={form}
                            // mutate={mutate}
                            // isMutating={isMutating}
                            setIsEditVisible={setIsEditVisible}
                        />
                    }
                </div>
            </div >
            <Divider />
            {isEditVisible &&
                <Form form={form} layout='vertical' disabled>
                    <ReactorSpecifications />
                    <Divider />
                    <ReactorPart />
                </Form>}
            {!isEditVisible &&
                // <Spin spinning={isMutating || ldProducerLab}>
                <Form layout="vertical" form={form}
                // onFinish={onSubmitFinish}
                >
                    <ReactorSpecificationsEdit />
                    <Divider />
                    <ReactorPartEdit />
                </Form>
                // </Spin >
            }
        </>
    )
}
