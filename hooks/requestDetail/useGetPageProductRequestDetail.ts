import useSWR from "swr";
import { listFetcher } from "../../lib/server/listFetcher";

interface PropType {
  data: DataItemType[] | undefined;
  mutate: any;
  isLoading: boolean;
}

export interface DataItemType {
  Uid: string;
  ProductId: number;
  ProductUid: string;
  ProductName: string;
  ProductDensityTypeId: number;
  ProductUsageExploitation: number;
  ProductUsageWasted: number;
}

const useGetPageProductRequestDetail = (uid: string): PropType => {
  const { data, isLoading, mutate, isValidating } = useSWR(
    "/RequestDetail/GetAllProduct",
    (url) =>
      listFetcher(url, {
        arg: {
          requestMasterUid: uid,
          isLastStep: true,
        },
      })
  );

  return { data, isLoading: isLoading || isValidating, mutate };
};

export default useGetPageProductRequestDetail;
