import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const fileApi = {
  Upload: {
    url: "/File/Upload",
  },
  Download: {
    url: process.env.NEXT_PUBLIC_API_URL +"/api/downloadfile/download",
    type: z.object({
      uid: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        File_Content_Base64: z.string(),
      }),
    }),
  },
};

export { fileApi };
