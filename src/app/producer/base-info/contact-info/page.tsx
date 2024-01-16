"use client";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button, Divider, Typography, } from "antd";
import React, { useState } from "react";
import DisplayForm from "./components/display-form";
import EditModal from "./components/edit-modal";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";


export default function Page() {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showModal = () => {
        setIsEditModalVisible(true);
    };

    const { data, isLoading, mutate } = useSWR(
        ["/ProfilePersonContact/Get"],
        ([url, arg]: [string, any]) => listFetcher(url, { arg }))




    return (
        <>
            <>
                <div className="flex justify-between items-center">
                    <Typography.Title level={5} className="text-gray-901 text-right">
                        اطلاعات تماس
                    </Typography.Title>
                    <Button
                        className="max-md:w-full flex justify-center items-center gap-2"
                        size="large"
                        type="primary"
                        htmlType="submit"
                        onClick={showModal}
                    >
                        <PencilSquareIcon width={24} height={24} />
                        <span className="flex">
                            ویرایش
                        </span>
                    </Button>
                </div>
                <Divider />
                <DisplayForm
                    data={data}
                    isLoading={isLoading}
                />
                <EditModal
                    mutate={mutate}
                    data={data}
                    isEditModalVisible={isEditModalVisible}
                    setIsEditModalVisible={setIsEditModalVisible}
                />
            </>

        </>
    );
}
