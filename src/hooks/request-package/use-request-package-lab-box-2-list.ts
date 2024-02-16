import { useQuery } from "@tanstack/react-query";
import { RequestPackageApi } from "../../constance/request-package";
import { z } from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabBox2List;

const useRequestPackageLabBox2List = (
    data: z.infer<typeof apiData.type> | undefined
) => {
    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({ url: apiData.url, data }),
        select: (data: z.infer<typeof apiData.response>) => data.data,
        // enabled: typeof data?.taskId === "string",
    });

    return { ...query, ...apiData };
};

export default useRequestPackageLabBox2List;


