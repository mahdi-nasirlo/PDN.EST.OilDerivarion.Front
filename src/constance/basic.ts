import {generalResponseZod} from "@/types/api-response";
import {z} from "zod";

const GetUserBySearchItem = z.object({
  SSO_Uid: z.string().optional(),
  Last_name: z.string().optional(),
  First_name: z.string().optional(),
  National_Code: z.string().optional(),
})

const GetStateForUserItem = z.object({
  Uid: z.string(),
  Name: z.string(),
  Checked: z.boolean()
})

const basicApi = {
  getStep: {
    url: "/Basic/GetSteps",
    sortBy: "Step_Name",
    fieldNames: { value: "UID", label: "Step_Name" },
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          ID: z.number(),
          UID: z.string(),
          Step_Key: z.string(),
          Step_Name: z.string(),
        })
      ),
    }),
  },
  GetAvailableReportsForStep: {
    url: "/Basic/GetAvailableReportsForStep",
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string(),
          Form_Name: z.string(),
        })
      ),
    }),
    type: z.object({
      step_UID: z.string(),
    }),
  },
  GetRegisteredReportsForStep: {
    url: "/Basic/GetRegisteredReportsForStep",
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string(),
          Form_Name: z.string(),
        })
      ),
    }),
    type: z.object({
      step_UID: z.string(),
    }),
  },
  AddReportToStep: {
    url: "/Basic/AddReportToStep",
    type: z.object({
      step_UID: z.string(),
      reports_UID: z.array(z.string()),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string(),
          Form_Name: z.string(),
        })
      ),
    }),
  },
  DeleteReportToStep: {
    url: "/Basic/DeleteReportFromStep",
    type: z.object({
      step_UID: z.string(),
      reports_UID: z.array(z.string()),
    }),
  },
  GetUserBySearch: {
    url: "/Basic/GetUserBySearch",
    type: z.object({
      Is_Active: z.boolean().optional(),
      National_Code: z.string().optional(),
      Last_name: z.string().optional(),
      First_name: z.string().optional()
    }),
    item: GetUserBySearchItem,
    response: generalResponseZod.extend({
      data: z.array(GetUserBySearchItem),
    }),
  },
  GetAllState: {
    url: "/Basic/GetAllState",
    response: generalResponseZod.extend({
      data: z.array(
          z.object({
            Name: z.string(),
            Uid: z.string()
          })
      ),
    }),
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean()
    }),
  },
  UserUpdateState: {
    url: "/Basic/UserUpdateState",
    type: z.object({
      user_Uid: z.string().optional(),
      sates_Uid: z.array(z.string())
    })
  },
  GetStateForUser: {
    url: "/Basic/GetStateForUser",
    type: z.object({
      user_Uid: z.string().uuid()
    }),
    item: GetStateForUserItem,
    response: generalResponseZod.extend({
      data: z.array(GetStateForUserItem)
    })
  }
};

export default basicApi;
