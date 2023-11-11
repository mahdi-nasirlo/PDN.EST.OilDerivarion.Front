"use client"

import {useContext, useState} from "react";
import WorkflowDataTableContext from "./workflowDataTableContext";
import useSWR from "swr";
import {listFetcher} from "../../../lib/server/listFetcher";
import GetPageRecordNumber from "../../../lib/getPageRecordNumber";

const UseWorkflow = () => {

    const context = useContext(WorkflowDataTableContext)


    const [initialData, setInitialData] = useState<any>(GetPageRecordNumber());

    const {data, isLoading, mutate, isValidating} = useSWR<any>(
        [context.apiUrl ? context.apiUrl : null, initialData],
        ([url, arg]: [url: string, arg: any]) => listFetcher(url, {arg})
    );

    return {...context, fetch: {data, isLoading: isLoading || isValidating, mutate, setInitialData,}}
};

export default UseWorkflow;