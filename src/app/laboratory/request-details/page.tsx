"use client";

import { Button, Divider } from "antd";
import React, { useState } from "react";
import FormMaterial from "./components/form-material";
import DataTable from "./components/data-table";
import RejectModal from "./components/reject-modal";


export default function Page() {

    const [modalVisible, setModalVisible] = useState(false);

    const showModalCancel = () => {
        setModalVisible(true);
    };

    return (
        <>
            <div className="box-border w-full p-6">
                <FormMaterial />
                <DataTable />
                <Divider />
                <div className='flex gap-6'>
                    <Button
                        className="w-1/2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    // onClick={showModal}
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
                <RejectModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </div>
        </>
    )
}
