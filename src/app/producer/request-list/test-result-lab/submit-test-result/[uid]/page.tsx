"use client";

import React from "react";
import useSWR from "swr";
import {listFetcher} from "../../../../../../../lib/server/listFetcher";
import DataTable from "@/app/producer/step18/test-result-lab/submit-test-result/[uid]/components/data-tabe";


export default function Page({
                                 params,
                             }: {
    params: { uid: any };
}) {
    const {
        isLoading: ldlabresult,
        data: labresult,
        mutate,
    } = useSWR<any>("/TestItem/GetAllByBarcode", (url, arg: string, any) =>
        listFetcher(url, {
            arg: {
                barcode: params.uid
            }
        })
    );


    return (
        <>

            <DataTable params={params.uid} mutate={mutate} labresult={labresult} ldlabresult={ldlabresult}/>
            
        </>
    );
}
