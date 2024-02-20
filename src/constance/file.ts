import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const fileApi = {
  Upload: {
    url: "/File/Upload",
  },
  Download: {
    url: "/File/Download",
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
