import { generalResponseZod, notEmpty } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";
import Item from "antd/es/list/Item";
import { workflowApi } from "./workflow";

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
});
const GetRequestListItem = z.object({
  Request_Uid: z.string(),
  CanEdit: z.boolean(),
  Wrork_State: z.number(),
});

const Step = z.object({
  Step_id: z.string(),
  Step_Name: z.string(),
  Process_Id: z.string(),
  Name: z.string(),
  Step_Key: z.string(),
  Counting_position: z.number(),
  Roles_of_authorized_approvers: z.string(),
  Users_of_authorized_approvers: z.string(),
  Help_Text: z.string(),
  Is_Finish: z.boolean(),
  Is_Active: z.boolean(),
  WorkTime: z.number(),
  Creator_id: z.string(),
});

const Task = z.object({
  Title: z.string(),
  Model: z.any(),
  Table: z.object({
    Header: z.array(
      z.object({
        Key: z.string(),
        Value: z.string(),
        Hidden: z.boolean(),
      })
    ),
    Values: z.array(z.any()),
  }),
});

const Producer = z.object({
  Request_Uid: z.string(),
  Representative__National_Code: z.string(),
  Representative__Name: z.string(),
  Representative__Family: z.string(),
  Company__National_ID: z.string(),
  Company__SSO_UID: z.string(),
  Company__Name: z.string(),
  Company__Business_ID: z.string(),
  License_Number: z.string(),
  License_Expire_Date: z.string(),
  License_Expire_Date_Fa: z.string(),
  License_Type_ID: z.string(),
  License_Type_Name: z.string(),
  State_Uid: z.string(),
  State_Name: z.string(),
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
  GetRequestListForCurrentUser: {
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
  GetRequestList: {
    url: "/License/GetRequestList",
    Item: GetRequestListItem,
    response: generalResponseZod.extend({
      data: z.object({
        tasks: z.string().or(Task),
        step: z.array(Step),
      }),
    }),
  },
  GetRequest: {
    url: "/License/GetRequest",
    uid: "",
    type: z.object({
      request_Uid: z.string(),
    }),
    producer: Producer,
    response: generalResponseZod.extend({
      data: z.object({
        producer: Producer,
        choices: z.array(workflowApi.choices),
      }),
    }),
  },
  SetRequest: {
    url: "/License/SetRequest",
    type: z.object({
      request_Uid: z.string(),
      choice_Key: z.string(),
      description: z.string(),
    }),
  },
};
export default licenseApi;
