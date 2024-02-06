import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const RequestPackageReportListItem = z.object({
  uid: z.string().nullable(),
  Form_Key: z.string(),
  Form_Type: z.number(),
  Form_Name: z.string(),
});

const VisitScheduleListItem = z.object({});
const RequestPackageApi = {
  RequestPackageFinalization: {
    url: "/RequestPackage/RequestPackageFinalization",
  },
  RequestPackageReportList: {
    url: "/RequestPackage/RequestPackageReportList",
    type: z.object({
      step_Key: z.string(),
      package_UID: z.string().uuid().optional(),
    }),
    item: RequestPackageReportListItem,
    response: generalResponseZod.extend({
      data: z.array(RequestPackageReportListItem),
    }),
  },
  VisitScheduleAdd: {
    url: "/RequestPackage/VisitScheduleAdd",
    type: z.object({
      visit_Type: z.number(),
      package_UID: z.string().uuid(),
      t1_Str: z.string(),
      t2_Str: z.string(),
      t3_Str: z.string(),
      description: z.string(),
    }),
    // item: RequestPackageReportListItem,
    // response: generalResponseZod.extend({
    //   data: z.array(RequestPackageReportListItem),
    // }),
  },
  VisitScheduleList: {
    url: "/RequestPackage/VisitScheduleList",
    type: z.object({
      package_UID: z.string().uuid().optional(),
      taskId: z.string()
    }),
    item: VisitScheduleListItem,
    response: generalResponseZod.extend({
      data: z.array(VisitScheduleListItem),
    }),
  },
};

export { RequestPackageApi };
