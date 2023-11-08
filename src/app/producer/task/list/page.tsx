"use client";

import React, {useState} from "react";
import useSWR from "swr";
import DataTable from "./components/data-table";
import {addIndexToData} from "../../../../../lib/addIndexToData";
import {listFetcher} from "../../../../../lib/server/listFetcher";

export default function Home() {
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const showModal = () => {
        setIsEditModalVisible(true);
    };

    const {data, isLoading, mutate, isValidating} = useSWR<any>(
        ["/WorkFlowRequest/GetAllStep02"],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url)
    );

    return (
        <>
            <div className="box-border w-full mt-8 p-6">
                <DataTable
                    isValidating={isValidating}
                    mutate={mutate}
                    task={addIndexToData(data)}
                    isLoading={isLoading}
                />
            </div>
        </>
    );
}
