import useSWRMutation from "swr/mutation";
import customFetch from "../../lib/server/customeFetcher";

const useUpdateMaterial = () => useSWRMutation(
    "/Material/Update",
    (url, arg) =>
        customFetch({url: {path: url}, method: "POST", data: arg.arg}));


export default useUpdateMaterial;