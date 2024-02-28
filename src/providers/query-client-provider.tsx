"use client";

import React from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { getResponseError } from "@/utils/getResponse";
import { notification } from "antd/lib";
import { useRedirectToSso } from "@/hooks/use-auth";
import { ssoApi } from "../constance/auth";

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const redirectToSso = useRedirectToSso(undefined);

  const [api, contextHolder] = notification.useNotification();

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSuccess: async (data) => {
        const result: z.infer<typeof generalResponseZod> = data as any;

        if (!result.success) {
          api.error({ message: result.message });
        }

        if (result.success && result.notify) {
          api.success({ message: result.message });
        }

        if (result.status === 401) {
          localStorage.removeItem(ssoApi.access_token_Key);
          redirectToSso.execute(result);
        }
      },
      onError: (error) => {
        const message = getResponseError(error);
        api.error({ message });
      },
    }),
    mutationCache: new MutationCache({
      onSuccess: (data: unknown) => {
        const result: z.infer<typeof generalResponseZod> = data as any;

        if (result.success) {
          api.success({ message: result.message });
        }

        if (!result.success) {
          api.error({ message: result.message });
        }
      },
    }),
  });

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
      {contextHolder}
      <ReactQueryDevtools initialIsOpen={true} />
    </TanstackQueryClientProvider>
  );
};

export default QueryClientProvider;
