import { AxiosRequestConfig } from "axios";
import { useSession } from "next-auth/react";
import { QueryKey, useQuery as tanstackQuery, UseQueryOptions } from "@tanstack/react-query";
import customFetcher from "@/utils/fetch-with-session";
import { GeneralResponseType } from "@/types/api-response";


const useQuery = (props: UseQueryOptions & {fn: AxiosRequestConfig}) => {
  const session = useSession();
  const enabled = props?.enabled ?? (session.status !== 'loading');

  return tanstackQuery({
    ...props,
    queryFn:  ():Promise<GeneralResponseType>  => customFetcher({
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
