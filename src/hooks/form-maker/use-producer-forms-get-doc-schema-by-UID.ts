import {useQuery} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = formMakerApi.ProducerFormsGetDocSchemaByUid

const useProducerFormsGetDocSchemaByUid = (data: z.infer<typeof apiData.type> | undefined) => {

    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: typeof data?.form_UID == "string" && typeof data?.form_Key == "string",
        select: (data: z.infer<typeof apiData.response>) => data.data
    })

    return {...query, ...apiData}
};

export default useProducerFormsGetDocSchemaByUid;