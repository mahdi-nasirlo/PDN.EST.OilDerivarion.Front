import { useQuery } from "@tanstack/react-query";
import userRoleStateApi from "../../../../constance/user-role-state";
import fetchWithSession from "@/utils/fetch-with-session";
import { z } from "zod";

const apiData = userRoleStateApi.GetAllRole;

const useGetAllRole = () => {
  const query = useQuery({
    queryKey: [apiData.url],
    queryFn: () => fetchWithSession({ url: apiData.url, notify: false }),
    select: (data: z.infer<typeof apiData.response>) => data.data,
  });

  const treeData = query.data?.map((item: any) => ({
    value: item.uid,
    label: item.name,
  }));

  return { ...query, treeData };
};

export default useGetAllRole;
