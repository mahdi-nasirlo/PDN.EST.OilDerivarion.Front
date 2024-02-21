import {useQuery} from "@tanstack/react-query";
import {formMakerApi} from "../../constance/form-maker";
import {z} from "zod";
import fetchWithSession from "@/utils/fetch-with-session";

const apiData = formMakerApi.ProducerFormsGetDocSchemaByUid

const useProducerFormsGetDocSchemaByUid = (data: z.infer<typeof apiData.type> | undefined) => {

    const query = useQuery({
        queryKey: [apiData.url, data],
        queryFn: () => fetchWithSession({url: apiData.url, data}),
        enabled: typeof data?.form_UID == "string",
        select: (data: z.infer<typeof apiData.response>) => ({
            Schema_Data: typeof (data.data.Schema_Data as any) == "string" ? JSON.parse(data.data?.Schema_Data) : data.data?.Schema_Data,
            form_data: JSON.parse(data.data.form_data)
        })
    })

    return {...query, ...apiData}
};

export default useProducerFormsGetDocSchemaByUid;