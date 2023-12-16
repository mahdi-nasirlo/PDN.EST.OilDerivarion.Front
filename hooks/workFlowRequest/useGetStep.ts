import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";
import { Choice } from "../../interfaces/requestDetail";

export interface ApiTabType {
  name: string;
  key: string;
  url: string;
  type: "1" | "2";
}

interface CalendarData {
  gregorian_year: number;
  gregorian_month: number;
  gregorian_day: number;
}
interface DataFetchType {
  choices: Choice[];
  tabs: ApiTabType[];
  task: {
    processId: string;
    stepId: string;
    reference_ID: string;
    group_ID: string;
    step_Name: string;
    counting_position: string;
    userId: number;
  };
  calendar?: CalendarData[] | undefined;
}

const useGetStep = ({ taskId, apiUrl }: { taskId: string; apiUrl: string }) => {
  const { isValidating, isLoading, data, mutate } = useSWR<DataFetchType>(
    apiUrl ? apiUrl : null,
    (url) =>
      listFetcher(url, {
        arg: {
          taskId: taskId,
        },
      })
  );

  return { data, mutate, isLoading: isLoading || isValidating };
};

export default useGetStep;
