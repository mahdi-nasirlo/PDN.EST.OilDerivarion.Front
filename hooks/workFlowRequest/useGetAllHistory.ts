import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";

export type LogHistory = {
    "Task_history_id": string,
    "Task_id": string,
    "Process_ID": string,
    "Process_name": string,
    "Current_Step_Name": string,
    "Step_id": string,
    "Step_Name": string,
    "Choice_id": string,
    "Choice_Key": string,
    "Label": string,
    "Description_text": string,
    "Role": string,
    "UserId": number,
    "UserDescription": string,
    "Status": number,
    "Creator_id": string,
    "Start_Time": string,
    "End_Time": string
}

const useGetAllHistory = (uid: string | null | undefined) => {

    const request = useSWR<LogHistory[]>(
        uid ? `/WorkFlowRequest/GetAllHistory` : null,
        (url) => listFetcher(url, {
            arg: {
                "taskId": uid
            }
        }))

    return {...request}
}

export default useGetAllHistory;