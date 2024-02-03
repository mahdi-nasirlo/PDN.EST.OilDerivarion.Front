import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const GetUserBySearchItem = z.object({
  uid: z.string().optional(),
  last_name: z.string().optional(),
  first_name: z.string().optional(),
  national_Code: z.string().optional(),
  states: z.string().optional(),
  roles: z.string(),
});

const GetStateForUserItem = z.object({
  Uid: z.string(),
  Name: z.string(),
  Checked: z.boolean(),
});

const GetRolesForUserItem = z.object({
  RoleId: z.string(),
  RoleName: z.string(),
  Checked: z.boolean(),
});

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
      is_Active: z.boolean().optional(),
      national_Code: z.string().optional(),
      last_name: z.string().optional(),
      first_name: z.string().optional(),
    }),
    item: GetUserBySearchItem,
    response: generalResponseZod.extend({
      data: z.array(GetUserBySearchItem),
    }),
  },
  GetAllState: {
    url: "/Basic/GetAllState",
    sortBy: "Name",
    fieldNames: { value: "Uid", label: "Name" },
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Name: z.string(),
          Uid: z.string(),
        })
      ),
    }),
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean(),
    }),
  },
  UserUpdateState: {
    url: "/Basic/UserUpdateState",
    type: z.object({
      user_Uid: z.string().optional(),
      sates_Uid: z.array(z.string()),
    }),
  },
  GetStateForUser: {
    url: "/Basic/GetStateForUser",
    type: z.object({
      user_Uid: z.string().uuid(),
    }),
    item: GetStateForUserItem,
    response: generalResponseZod.extend({
      data: z.array(GetStateForUserItem),
    }),
  },
  GetAllRole: {
    url: "/Basic/GetAllRole",
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          uid: z.string(),
          name: z.string(),
          roleKey: z.string(),
          roleTypeName: z.string(),
        })
      ),
    }),
  },
  UserUpdateRole: {
    url: "/Basic/UserUpdateRole",
    type: z.object({
      userUid: z.string().optional(),
      rolesUid: z.array(z.string()),
    }),
  },
  GetRolesForUser: {
    url: "/Basic/GetRolesForUser",
    type: z.object({
      userUid: z.string().uuid(),
    }),
    item: GetRolesForUserItem,
    response: generalResponseZod.extend({
      data: z.array(GetRolesForUserItem),
    }),
  },
};

export default basicApi;
