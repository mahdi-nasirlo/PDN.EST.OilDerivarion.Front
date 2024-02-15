import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RequestPackageApi} from "../../constance/request-package";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = RequestPackageApi.LabBoxDelete;

const useLabBoxDelete = () => {

    const queryClient = useQueryClient();

    const query = useMutation({
        mutationFn: async (
            data: z.infer<typeof apiData.type>
        ): Promise<typeof apiData.response> => await fetchWithSession({
            url: apiData.url,
            data,
        }),
        onSuccess: async (data) => {
            await queryClient.setQueryData([RequestPackageApi.BoxList.url], data);
        },
    });

    return {...query, ...apiData};
};

export default useLabBoxDelete;
