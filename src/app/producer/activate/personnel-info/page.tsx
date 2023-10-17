"use client";

import { Button, Divider } from "antd";
import React from "react";
import CreateForm from "./components/create-form";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { SetEmployeeMember } from "../../../../../interfaces/Base-info";
import { listFetcher } from "../../../../../lib/server/listFetcher";
import DataTable from "./components/data-table";
import { addIndexToData } from "../../../../../lib/addIndexToData";

export default function Page() {

    const router = useRouter()

    const { data: EmployeeMember, isLoading: ldEmployeeMember, mutate } = useSWR<{
        records: SetEmployeeMember[];
        count: number;
    }>(
        ["/Producer/GetPageEmployee"],
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
                MainMember={addIndexToData(EmployeeMember?.records)}
                ldMainMember={ldEmployeeMember}
                mutate={mutate}
            />
            <Divider />
            <Button
                className="w-full management-info-form-submit btn-filter"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => router.push("/producer/activate/license-info")}
            >
                <span className="flex gap-3 justify-center "> ثبت</span>
            </Button>
        </>
    );
}
