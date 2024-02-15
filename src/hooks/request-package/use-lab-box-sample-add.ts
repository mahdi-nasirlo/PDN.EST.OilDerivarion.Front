import {useMutation, useQueryClient} from "@tanstack/react-query";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";
import {RequestPackageApi} from "../../constance/request-package";

const apiData = RequestPackageApi.BoxSampleAdd;

const useBoxSampleAdd = ({package_UID, lab_UID}: { package_UID: string, lab_UID: string }) => {

    const queryClient = useQueryClient()

    const query = useMutation({
        mutationFn: (data: z.infer<typeof apiData.type>): Promise<z.infer<typeof apiData.response>> => fetchWithSession({
            url: apiData.url,
            notify: true,
            data: {
                ...data,
                lab_UID: lab_UID,
                package_UID: package_UID
            }
        }),
        onSuccess: async (data) => {

            await queryClient.invalidateQueries({queryKey: [RequestPackageApi.BoxList.url], exact: false})

        }
    })

    return {...query, ...apiData}
};

export default useBoxSampleAdd;