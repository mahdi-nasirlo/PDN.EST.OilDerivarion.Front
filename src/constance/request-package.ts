import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

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
  ReadOnly: z.boolean(),
  final_description: z.string().nullable(),
});

const VisitOpinionListItem = z.object({
  visit_Type: z.number(),
  package_UID: z.string().uuid(),
  naft_opinion_1: z.string(),
  is_naft_peresent: z.boolean(),
  samt_opinion_1: z.string(),
  is_samt_peresent: z.boolean(),
  est_opinion_1: z.string(),
  is_est_peresent: z.boolean(),
});
const LabVisitOpinionListItem = z.object({
  ReadOnly: z.boolean(),
  visit_Type: z.number(),
  naft_opinion_2: z.string(),
  samt_opinion_2: z.string(),
  est_opinion_3: z.string(),
});

const FinalResultListItem = z.object({
  visit_Type: z.number().optional(),
  product_uid: z.string().optional(),
  product_name: z.string().optional(),
  Naft_Opinion_ID: z.number(),
  naft_opinion_description: z.string(),
  naft_result_modify_date_time: z.string().optional(),
  Samt_Opinion_ID: z.number(),
  samt_opinion_description: z.string(),
  samt_result_modify_date_time: z.string().optional(),
  est_Opinion_ID: z.number(),
  est_opinion_description: z.string(),
  System_Opinion_ID: z.number(),
  est_result_modify_date_time: z.string().optional(),
  system_test_item: z.string().optional(),
})

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
    form1: z.object({
      naft_1: z.string(),
      naft_2: z.string(),
      naft_3: z.string(),
      naft_description: z.string().nullable(),
    }),
    form2: z.object({
      samt_1: z.string(),
      samt_2: z.string(),
      samt_3: z.string(),
      samt_description: z.string().nullable(),
    }),
    form3: z.object({
      est_1: z.string(),
      est_2: z.string(),
      est_3: z.string(),
      est_description: z.string(),
    }),
    response: generalResponseZod.extend({
      data: VisitScheduleListItem,
    }),
  },
  VisitOpinionAdd: {
    url: "/RequestPackage/VisitOpinionAdd",
    type: z.object({
      visit_Type: z.number(),
      package_UID: z.string().uuid(),

      naft_opinion_1: z.string(),
      is_naft_peresent: z.boolean(),

      samt_opinion_1: z.string(),
      is_samt_peresent: z.boolean(),

      est_opinion_1: z.string(),
      is_est_peresent: z.boolean(),
    }),
  },
  VisitOpinionList: {
    url: "/RequestPackage/VisitOpinionList",
    type: z.object({
      package_UID: z.string().uuid().optional(),
    }),
    item: VisitOpinionListItem,
    form1: z.object({
      naft_opinion_1: z.string(),
      is_naft_peresent: z.boolean(),
    }),
    form2: z.object({
      samt_opinion_1: z.string(),
      is_samt_peresent: z.boolean(),
    }),
    form3: z.object({
      est_opinion_1: z.string(),
      is_est_peresent: z.boolean(),
    }),
    response: generalResponseZod.extend({
      data: VisitOpinionListItem,
    }),
  },
  LabVisitOpinionAdd: {
    url: "/RequestPackage/LabVisitOpinionAdd",
    type: z.object({
      visit_Type: z.number(),
      package_UID: z.string().uuid(),

      naft_opinion_2: z.string(),

      samt_opinion_2: z.string(),

      est_opinion_3: z.string(),
    }),
  },
  LabVisitOpinionList: {
    url: "/RequestPackage/LabVisitOpinionList",
    type: z.object({
      package_UID: z.string().uuid().optional(),
    }),
    item: LabVisitOpinionListItem,
    form1: z.object({
      naft_opinion_2: z.string(),
    }),
    form2: z.object({
      samt_opinion_2: z.string(),
    }),
    form3: z.object({
      est_opinion_3: z.string(),
    }),
    response: generalResponseZod.extend({
      data: LabVisitOpinionListItem,
    }),
  },
  FinalResultList: {
    url: "/RequestPackage/FinalResultList",
    type: z.object({
      package_UID: z.string()
    }),
    item: FinalResultListItem,
    response: generalResponseZod.extend({
      data: z.array(FinalResultListItem)
    })
  },
  FinalResultAdd: {
    url: "/RequestPackage/FinalResultAdd",
    type: z.object({
      package_UID: z.string(),
      product_UID: z.string(),
      visit_Type: z.number(),
      naft_Opinion_ID: z.number(),
      naft_opinion_description: z.string(),
      samt_Opinion_ID: z.number(),
      samt_opinion_description: z.string(),
      est_Opinion_ID: z.number(),
      est_opinion_description: z.string(),
      naft_test_item: z.array(z.string()),
      samt_test_item: z.array(z.string()),
      est_test_item: z.array(z.string())
    }),
    response: generalResponseZod.extend({data: z.any()})
  }
};

export { RequestPackageApi };