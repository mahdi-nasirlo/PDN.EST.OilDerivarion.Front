"use client";

import useSWR from "swr";
import {listFetcher} from "../../../../../../lib/server/listFetcher";
import WorkflowDataViewer from "../../../../../../components/WorkflowDataViewer";

interface PropType {
    params: { uid: string }
}

export default function Home(props: PropType) {

    const {isLoading, data, mutate} = useSWR("/WorkFlowRequest/GetStep02", (url) => listFetcher(url, {
        arg: {
            taskId: props.params.uid
        }
    }))

    return (
        <>
            <div className="box-border w-full p-6">
                <WorkflowDataViewer/>
            </div>
        </>
    );
}
