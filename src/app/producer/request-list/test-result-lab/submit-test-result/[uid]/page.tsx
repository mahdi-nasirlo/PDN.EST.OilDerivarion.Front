"use client";

import React from "react";
import DataTable
    from "@/app/laboratory-panel/request-list/test-result-lab/submit-test-result/[uid]/components/data-tabe"
import useSWR from "swr";
import {listFetcher} from "../../../../../../../lib/server/listFetcher";


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
