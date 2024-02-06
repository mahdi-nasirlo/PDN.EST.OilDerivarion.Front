import { z } from "zod";
import { generalResponseZod } from "@/types/api-response";

const RequestPackageReportListItem = z.object({
  uid: z.string().nullable(),
  Form_Key: z.string(),
  Form_Type: z.number(),
  Form_Name: z.string(),
});

const VisitScheduleListItem = z.object({
  visit_Type: z.number(),
  package_UID: z.string().uuid(),
  naft_1: z.string(),
  naft_2: z.string(),
  naft_3: z.string(),
  naft_description: z.string().nullable(),
  samt_1: z.string(),
  samt_2: z.string(),
  samt_3: z.string(),
  samt_description: z.string().nullable(),
  est_1: z.string(),
  est_2: z.string(),
  est_3: z.string(),
  est_description: z.string(),
  final_time: z.string(),
  final_description: z.string().nullable(),
});
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
      naft_1: z.string(),
      naft_2: z.string(),
      naft_3: z.string(),
      naft_description: z.string(),
      samt_1: z.string(),
      samt_2: z.string(),
      samt_3: z.string(),
      samt_description: z.string(),
      est_1: z.string(),
      est_2: z.string(),
      est_3: z.string(),
      est_description: z.string(),
      final_time: z.string(),
      final_description: z.string(),
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
      // taskId: z.string(),
    }),
    item: VisitScheduleListItem,
    response: generalResponseZod.extend({
      data: z.array(VisitScheduleListItem),
    }),
  },
};

export { RequestPackageApi };
