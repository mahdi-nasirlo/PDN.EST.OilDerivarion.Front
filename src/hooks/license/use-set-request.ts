import fetchWithSession from "@/utils/fetch-with-session";
import { useMutation } from "@tanstack/react-query";
import licenseApi from "constance/license";
import React from "react";
import { z } from "zod";

const apiData = licenseApi.SetRequest;

export default function useSetRequest() {
  return useMutation({
    mutationFn: (data: z.infer<typeof apiData.type>) =>
      fetchWithSession({ url: apiData.url, data }),
  });
}
