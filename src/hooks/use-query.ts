import { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { QueryKey, useQuery as tanstackQuery, UseQueryOptions } from "@tanstack/react-query";
import { ssoApi } from "constance/auth";
import customFetcher from "@/utils/customeFetcher";
import { useEffect } from "react";

interface QueryPropsType {
  queryKey: QueryKey;
  queryFn: AxiosRequestConfig;
  config?:UseQueryOptions, 
}

const useQuery = (props: UseQueryOptions & {fn: AxiosRequestConfig}) => {
  const session = useSession();
  const enabled = props?.enabled ?? (session.status !== 'loading');

  return tanstackQuery({
    ...props,
    queryFn: async () => await customFetcher({
      url: props.fn.url as string,
      method: props.fn.method || "POST",
      data: props.fn.data,
      params: props.fn.params,
      //@ts-ignore
      token: session?.data?.accessToken
    }),
    queryKey: [...props.queryKey, session.status],
    enabled: enabled,
  });
};




export default useQuery;
