import useSWRMutation from "swr/mutation";
import customFetch from "../../lib/server/customeFetcher";

const useUpdateLaboratory = () =>
  useSWRMutation("/Lab/Update", (url, arg) =>
    customFetch({ url: { path: url }, method: "POST", data: arg.arg })
  );

export default useUpdateLaboratory;
