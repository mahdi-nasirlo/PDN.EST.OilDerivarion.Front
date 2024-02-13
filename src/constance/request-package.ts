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
  naft_Opinion_ID: z.number(),
  naft_opinion_description: z.string(),
  naft_result_modify_date_time: z.string().optional(),
  samt_Opinion_ID: z.number(),
  samt_opinion_description: z.string(),
  samt_result_modify_date_time: z.string().optional(),
  est_Opinion_ID: z.number(),
  est_opinion_description: z.string(),
  est_test_item: z.array(z.object({
    uid: z.string(),
    name: z.string()
  }).or(z.string())),
  samt_test_item: z.array(z.object({
    uid: z.string(),
    name: z.string()
  }).or(z.string())),
  naft_test_item: z.array(z.object({
    uid: z.string(),
    name: z.string()
  }).or(z.string())),
  system_Opinion_ID: z.number(),
  est_result_modify_date_time: z.string().optional(),
  system_test_item: z.string().optional(),
  // ReadOnly: z.any()
})

const BoxListItem = z.object({
  box_ID: z.number(),
  box_usage_type: z.number(),
  box_UID: z.string(),
  capacity: z.number(),
  samples: z.array(z.object({
    name: z.string(),
    UID: z.string()
  })).or(z.string()).nullable()
})

const RequestPackageApi = {
  RequestPackageFinalization: {
    url: "/RequestPackage/RequestPackageFinalization",
    type: z.object({
      uid: z.string().optional()
    })
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
      data: z.object({
        visit_Type: z.number(),
        requestPackageFinalResultList: z.array(FinalResultListItem)
      })
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
  },
  BoxList: {
    url: "/RequestPackage/BoxList",
    type: z.object({
      package_UID: z.string()
    }),
    item: BoxListItem,
    response: generalResponseZod.extend({
      data: z.array(BoxListItem)
    })
  },
  BoxAdd: {
    url: "/RequestPackage/BoxAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      box_usage_type: z.number()
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({}))
    })
  },
  BoxGetAvailableList: {
    url: "/RequestPackage/BoxGetAvailableList",
    fieldName: {value: "UID", label: "Name"},
    type: z.object({
      package_UID: z.string(),
      state_ID: z.number().optional()
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({
        UID: z.string(),
        Status: z.number().optional(),
        Name: z.string()
      }))
    })
  },
  BoxSampleAdd: {
    url: "/RequestPackage/BoxSampleAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      sample_UID: z.string()
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({}))
    })
  },
  BoxSampleGetAvailableList: {
    url: "/RequestPackage/BoxSampleGetAvailableList",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string()
    }),
    fieldName: {value: "Sample_UID", label: "Name"},
    response: generalResponseZod.extend({
      data: z.array(z.object({
        Sample_UID: z.string(),
        Name: z.string()
      }))
    })
  },
  BoxSampleDelete: {
    url: "/RequestPackage/BoxSampleDelete",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      sample_UID: z.string()
    }),
    response: generalResponseZod.extend({
      data: z.object({})
    })
  }
};

export { RequestPackageApi };
