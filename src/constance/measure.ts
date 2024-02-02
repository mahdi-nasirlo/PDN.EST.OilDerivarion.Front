import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const MeasureGetPages = z.object({
  uid: z.string(),
  name: z.string(),
  isActive: z.boolean(),
});

const measureApi = {
  BasicMeasureList: {
    url: "/Basic/BasicMeasureList",
    sortBy: "name",
    fieldNames: { value: "uid", label: "name" },
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
    Item: MeasureGetPages,
    response: generalResponseZod.extend({
      data: z.array(MeasureGetPages),
    }),
  },

  BasicMeasureGetPage: {
    url: "/Basic/MeasureGetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    Item: MeasureGetPages,
    response: generalResponseZod.extend({
      data: z.object({ records: z.array(MeasureGetPages) }),
    }),
  },

  MeasureCreate: {
    url: "/Basic/MeasureCreate",
    type: z.object({
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required }),
    }),
  },
  MeasureGet: {
    url: "/Basic/MeasureGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        uid: z.string().uuid(),
        name: z.string(),
        isActive: z.boolean(),
      }),
    }),
  },
  MeasureUpdate: {
    url: "/Basic/MeasureUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required }),
    }),
  },
};
export default measureApi;
