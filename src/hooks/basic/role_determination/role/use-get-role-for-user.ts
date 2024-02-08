import { useQuery } from "@tanstack/react-query";
import basicApi from "../../../../constance/user-role-state";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";

const apiData = basicApi.GetRolesForUser;

const useGetRoleForUser = (uid: string | undefined) => {
  const data: z.infer<typeof apiData.type> = {
    userUid: uid as string,
  };

  const query = useQuery({
    queryKey: [apiData.url, uid],
    queryFn: () => fetchWithSession({ url: apiData.url, data }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
    enabled: typeof uid === "string",
  });

  const treeData = query.data?.map((item) => item.uid);

  return { ...query, treeData };
};

export { useGetRoleForUser };
