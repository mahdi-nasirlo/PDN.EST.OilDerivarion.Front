import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";
import Item from "antd/es/list/Item";

const GetRequestList = z.object({
  Id: z.number(),
  Uid: z.string().uuid(),
  Representative__National_Code: z.string(),
  Representative__Name: z.string(),
  Representative__Family: z.string(),
  Company__National_ID: z.string(),
  Company__Name: z.string(),
  Company__Business_ID: z.string(),
  License_Number: z.string(),
  License_Expire_Date_Fa: z.string(),
  Wrork_State: z.number(),
  Wrork_State_Value: z.string(),
  License_Type: z.string(),
  State_Name: z.string(),
  Response_Message: z.string(),
  Response_DateTime: z.string(),
});

const licenseApi = {
  GetProducerInfo: {
    url: "/License/GetProducerInfo",
    response: generalResponseZod.extend({
      data: z.object({
        representative__Name: z.string(),
        representative__Family: z.string(),
        representative__National_Code: z.string(),
        company__Name: z.string(),
        company__National_ID: z.string(),
      }),
    }),
  },
  GetAvailableTypes: {
    url: "/License/GetAvailableTypes",
    sortBy: "Id",
    fieldNames: { value: "Id", label: "License_Type" },
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          License_Type: z.string(),
          Id: z.number(),
        })
      ),
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
  GetRequestList: {
    url: "/License/GetRequestListForCurrentUser",
    Item: GetRequestList,
    response: generalResponseZod.extend({
      data: z.array(GetRequestList),
    }),
  },
  DelRequest: {
    url: "/License/DelRequest",
    type: z.object({
      uid: z.string(),
    }),
  },
};
export default licenseApi;
