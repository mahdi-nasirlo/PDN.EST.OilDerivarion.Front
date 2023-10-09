"use client";

import { Button, Divider, Typography, } from "antd";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import DisplayForm from "./components/display-form";
import EditModal from "./components/edit-modal";

export default function Home() {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showModal = () => {
        setIsEditModalVisible(true);
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <Typography className='max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901'>
                    اطلاعات مدیریتی
                </Typography>
                <Button
                    className="max-md:w-full flex justify-center items-center gap-2"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={showModal}
                >
                    <PlusIcon width={24} height={24} />
                    <span className="flex">
                        افزودن
                    </span>
                </Button>
            </div>
            <Divider />
            <DisplayForm
            // data={data}
            // isLoading={isLoading}
            />
            <EditModal
                // mutate={mutate}
                // data={data}
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
            />
        </>
    );
}
