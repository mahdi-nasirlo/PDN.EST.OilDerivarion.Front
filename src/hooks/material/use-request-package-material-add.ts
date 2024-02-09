import {useMutation, useQueryClient} from "@tanstack/react-query";
import {materialApi} from "../../constance/material";
import fetchWithSession from "@/utils/fetch-with-session";
import {z} from "zod";

const apiData = materialApi.RequestPackageMaterialAdd

const useRequestPackageMaterialAdd = (package_UID?: string) => {

    const queryClient = useQueryClient()

  const query = useMutation({
      mutationFn: (
          data: z.infer<typeof apiData.type>
      ): Promise<z.infer<typeof apiData.response>> =>
          fetchWithSession({
              url: apiData.url,
              notify: true,
              data: {
                  ...data,
                  request__Package_UID: data.request__Package_UID ?? package_UID,
              },
          }),
      onSuccess: async (data) => {

          queryClient.setQueryData([materialApi.RequestPackageMaterialList.url], data)

          await queryClient.invalidateQueries({
              queryKey: [materialApi.RequestPackageMaterialList.url],
              exact: false,
          });


      }
  })

    return {...query, schema: apiData.type}
}

export {useRequestPackageMaterialAdd}