import useSWR from "swr";
import {listFetcher} from "../../lib/server/listFetcher";
import {Choice} from "../../interfaces/requestDetail";

interface DataFetchType {
    choices: Choice[],
    task: {
        processId: string,
        stepId: string,
        reference_ID: string,
        group_ID: string,
        step_Name: string,
        counting_position: string,
        userId: number
    }
}

const useGetStep = ({taskId, apiUrl}: { taskId: string, apiUrl: string }) => {

    const {
        isValidating,
        isLoading,
        data,
        mutate
    } = useSWR<DataFetchType>(
        apiUrl ? apiUrl : null,
        (url) => listFetcher(url, {
            arg: {
                taskId: taskId
            }
        }))


    return {data, mutate, isLoading: isLoading || isValidating}
};

export default useGetStep;