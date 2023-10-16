"use client";

import { Button, Divider } from "antd";
import React from "react";
import CreateForm from "./components/create-form";
import { useRouter } from "next/navigation";
import DataTable from "./components/data-table";
import { SetMainMember } from "../../../../../interfaces/Base-info";
import useSWR from "swr";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import { addIndexToData } from "../../../../../lib/addIndexToData";



export default function Home() {

    const router = useRouter()

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
            <CreateForm mutate={mutate} />
            <DataTable
                MainMember={addIndexToData(MainMember?.records)}
                ldMainMember={ldMainMember}
                mutate={mutate}
            />
            <Divider />
            <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => router.push("/producer/activate/personnel-info")}
            >
                <span className="flex gap-3 justify-center "> ثبت</span>
            </Button>
        </>
    );
}
