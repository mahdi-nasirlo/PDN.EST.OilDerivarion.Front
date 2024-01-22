"use client";


import React, { useState } from 'react'
import { Button, Divider, Form, Typography } from 'antd';
import PrimaryExpiredRequestsDetailsForm from './components/primary-expired-requests-details-form';
import PrimaryExpiredRequestsDetailsTable from './components/primary-expired-requests-details-table';
import PrimaryExpiredRequestsDetailsModalSubmit from './components/primary-expired-requests-details-modal-submit';
import PrimaryExpiredRequestsDetailsModalCancel from './components/primary-expired-requests-details-modal-cancel';

export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleCancel, setModalVisibleCancel] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    };

    const showModalCancel = () => {
        setModalVisibleCancel(true);
    };


    return (
        <>
            <div className="box-border w-full p-6">
                <Typography className="text-right font-medium text-base">
                    لطفا اطلاعات خواسته شده را با دقت بررسی و سپس زمان بازدید را تایید نمایید.
                </Typography>
                <Divider />
                <Form name="form_item_path" layout="vertical">
                    <PrimaryExpiredRequestsDetailsForm />
                    <PrimaryExpiredRequestsDetailsTable />
                    <Divider />
                    <div className='flex gap-6'>
                        <Button
                            className="w-1/2"
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={showModal}
                        >
                            تایید زمان بازدید
                        </Button>
                        <Button
                            className="w-1/2 bg-red-500"
                            size="large"
                            type="primary"
                            htmlType="submit"
                            onClick={showModalCancel}
                        >
                            عدم تایید
                        </Button>
                    </div>
                </Form>
                <PrimaryExpiredRequestsDetailsModalSubmit modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <PrimaryExpiredRequestsDetailsModalCancel modalVisibleCancel={modalVisibleCancel} setModalVisibleCancel={setModalVisibleCancel} />
            </div>
        </>
    )
}
