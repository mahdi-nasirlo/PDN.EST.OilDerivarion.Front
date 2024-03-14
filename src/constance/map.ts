import { generalResponseZod, notEmpty } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const mapApi = {
  GetLocation: {
    url: "/Producer/GetLocation",
    type: z.object({
      uid: z.string().uuid(),
      type: z.number(),
    }),
    Item: z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        name: z.string(),
        address: z.string(),
        address_Lat: z.number(),
        address_Long: z.number(),
      }),
    }),
  },

  SetLocation: {
    url: "/Producer/SetLocation",
    type: z.object({
      uid: z.string(),
      address_Lat: z.number(),
      address_Long: z.number(),
      type: z.number(),
    }),
  },
};
export default mapApi;
