"use client"

import { useForm } from 'antd/es/form/Form';
import React, { useState } from 'react';
import PrimaryTestFactorsForm from './components/primary-test-factors-form';
import PrimaryTestFactorsTable from './components/primary-test-factors-table';
import PrimaryTestFactorsModal from './components/primary-test-factors-modal';

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);

    const [form] = useForm()

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleFormSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form values:", values); // Log the form values to the console
            closeModal();
        } catch (error) {
            console.error("Form validation failed:", error);
        }
    }; return (
        <>
            <PrimaryTestFactorsForm />
            <PrimaryTestFactorsTable setModalVisible={setModalVisible} />
            <PrimaryTestFactorsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </>
    )
}




