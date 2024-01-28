import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

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
      national_Code: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          firstName: z.string(),
          lastName: z.string(),
        })
      ),
    }),
  },
};

export default basicApi;
