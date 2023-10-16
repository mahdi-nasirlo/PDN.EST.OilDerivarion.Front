"use client";

import { Button, Divider, Typography, } from "antd";
import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import DataTable from "./components/data-table";
import CreateModal from "./components/create-modal";
import { SetMainMember } from "../../../../../interfaces/Base-info";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import useSWR from "swr";
import { addIndexToData } from "../../../../../lib/addIndexToData";


export default function Home() {

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showModal = () => {
        setIsEditModalVisible(true);
    };

    const { data: MainMember, isLoading: ldMainMember, mutate } = useSWR<{
        records: SetMainMember[];
        count: number;
    }>(
        ["/Producer/GetPageMainMember"],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, {
            arg: {
                fromRecord: 0,
                selectRecord: 10000
            }
        })
    );


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
            <DataTable
                mutate={mutate}
                MainMember={addIndexToData(MainMember?.records)}
                ldMainMember={ldMainMember}
            />
            <CreateModal
                mutate={mutate}
                // data={data}
                isEditModalVisible={isEditModalVisible}
                setIsEditModalVisible={setIsEditModalVisible}
            />
        </>
    );
}
