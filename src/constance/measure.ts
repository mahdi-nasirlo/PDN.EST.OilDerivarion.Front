import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const MeasureGetPages = z.object({
  uid: z.string(),
  name: z.string(),
  isActive: z.boolean(),
});

const measureApi = {
  MeasureGetPages: {
    url: "/Basic/BasicMeasureList",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
    Item: MeasureGetPages,
    response: generalResponseZod.extend({
      data: z.array(MeasureGetPages),
    }),
  },
  AddRequest: {
    url: "/License/AddRequest",
    type: z.object({
      representative__National_Code: z.string().optional(),
      representative__Name: z.string().optional(),
      representative__Family: z.string().optional(),
      company__National_ID: z.string().optional(),
      company__Name: z.string().optional(),
      company__Business_ID: z
        .string({ required_error: errorMessage.required })
        .regex(/^\d*$/, { message: errorMessage.number_invalid })
        .length(12, { message: "لطفا 12 رقم وارد کنید" }),
      license_Type_ID: z.number({ required_error: errorMessage.required }),
      license_Number: z
        .string({ required_error: errorMessage.required })
        .regex(/^\d*$/, { message: errorMessage.number_invalid })
        .length(12, { message: "لطفا 12 رقم وارد کنید" }),
      license_Expire_Date_Fa: z.string({
        required_error: errorMessage.required,
      }),
      state_Uid: z.string({ required_error: errorMessage.required }),
    }),
  },
};
export default measureApi;
