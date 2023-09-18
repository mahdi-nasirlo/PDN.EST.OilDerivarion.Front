"use client";

import React, { useState } from 'react'
import { Button, Divider, Form, Typography } from 'antd';
import PrimaryRequestsDetailsTable from './components/primary-requests-details-table';
import PrimaryRequestsDetailsForm from './components/primary-requests-details-form';
import PrimaryRequestsDetailsModalSubmit from './components/primary-requests-details-modal-submit';
import PrimaryRequestsDetailsModalCancel from './components/primary-requests-details-modal-cancel';

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
                    <PrimaryRequestsDetailsForm />
                    <PrimaryRequestsDetailsTable />
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
                <PrimaryRequestsDetailsModalSubmit modalVisible={modalVisible} setModalVisible={setModalVisible} />
                <PrimaryRequestsDetailsModalCancel modalVisibleCancel={modalVisibleCancel} setModalVisibleCancel={setModalVisibleCancel} />
            </div>
        </>
    )
}
