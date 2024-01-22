"use client";

import React from "react";
import DataTable from "./components/data-table";
import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";


export default function Page({
                                 params,
                             }: {
    params: { Uid: any };
}) {
    const {
        isLoading: ldlabresult,
        data: labresult,
        mutate,
    } = useSWR<any>("/RequestBarcode/GetAll_Lab", (url, arg: string, any) =>
        listFetcher(url, {
            arg: {
                requestMasterUid: params.Uid
            }
        })
    );


    return (
        <>
            <DataTable labresult={labresult} ldlabresult={ldlabresult}/>
        </>
    );
}
