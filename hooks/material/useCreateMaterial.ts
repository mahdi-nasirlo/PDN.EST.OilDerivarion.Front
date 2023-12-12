import useSWRMutation from "swr/mutation";
import customFetch from "../../lib/server/customeFetcher";

const useCreateMaterial = () => useSWRMutation(
    "/Material/Update",
    (url, arg) =>
        customFetch({url: {path: url}, method: "POST", data: arg.arg}));


export default useCreateMaterial;