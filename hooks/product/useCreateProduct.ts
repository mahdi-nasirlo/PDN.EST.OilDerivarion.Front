import useSWRMutation from "swr/mutation";
import customFetch from "../../lib/server/customeFetcher";

const useUpdateProduct = () =>
  useSWRMutation("/Product/Create", (url, arg) =>
    customFetch({ url: { path: url }, method: "POST", data: arg.arg })
  );

export default useUpdateProduct;
