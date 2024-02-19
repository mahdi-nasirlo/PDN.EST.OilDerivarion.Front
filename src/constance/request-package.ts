import { z } from "zod";
import { generalResponseZod } from "@/types/api-response";
import { errorMessage } from "./error-message";

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
  est_test_item: z.array(
    z
      .object({
        uid: z.string(),
        name: z.string(),
      })
      .or(z.string())
  ),
  samt_test_item: z.array(
    z
      .object({
        uid: z.string(),
        name: z.string(),
      })
      .or(z.string())
  ),
  naft_test_item: z.array(
    z
      .object({
        uid: z.string(),
        name: z.string(),
      })
      .or(z.string())
  ),
  system_Opinion_ID: z.number(),
  est_result_modify_date_time: z.string().optional(),
  system_test_item: z.string().optional(),
  // ReadOnly: z.any()
});
const boxListPrintItem = z.object({
  Production_Method: z.string(),
  Sample_Type: z.string(),
  name: z.string(),
  Box_Type: z.string(),
  Box_Data: z.string(),
  Sample_Code: z.string(),
});

const BoxListItem = z.object({
  box_ID: z.number(),
  box_usage_type: z.number(),
  box_UID: z.string(),
  capacity: z.number(),
  samples: z
    .array(
      z.object({
        name: z.string(),
        UID: z.string(),
      })
    )
    .or(z.string())
    .nullable(),
});

const LabBox2ListItem = z.object({
  IMEI: z.string(),
  Capacity: z.number(),
  Name: z.string(),
  UID: z.string(),
  Is_Opened: z.boolean(),
  Is_Opened_Value: z.string(),
  Is_Recordbble: z.boolean(),
});

const RequestPackageApi = {
  RequestPackageFinalization: {
    url: "/RequestPackage/RequestPackageFinalization",
    type: z.object({
      uid: z.string().optional(),
    }),
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
      package_UID: z.string(),
    }),
    item: FinalResultListItem,
    response: generalResponseZod.extend({
      data: z.object({
        visit_Type: z.number(),
        requestPackageFinalResultList: z.array(FinalResultListItem),
      }),
    }),
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
      est_test_item: z.array(z.string()),
    }),
    response: generalResponseZod.extend({ data: z.any() }),
  },
  BoxList: {
    url: "/RequestPackage/BoxList",
    type: z.object({
      package_UID: z.string(),
    }),
    item: BoxListItem,
    response: generalResponseZod.extend({
      data: z.array(BoxListItem),
    }),
  },
  BoxAdd: {
    url: "/RequestPackage/BoxAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      box_usage_type: z.number(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  BoxGetAvailableList: {
    url: "/RequestPackage/BoxGetAvailableList",
    fieldName: { value: "UID", label: "Name" },
    type: z.object({
      package_UID: z.string(),
      state_ID: z.number().optional(),
    }),
    Item: z.object({
      UID: z.string(),
      Status: z.number().optional(),
      Name: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string(),
          Status: z.number().optional(),
          Name: z.string(),
        })
      ),
    }),
  },
  BoxSampleAdd: {
    url: "/RequestPackage/BoxSampleAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      sample_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  BoxSampleGetAvailableList: {
    url: "/RequestPackage/BoxSampleGetAvailableList",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
    }),
    fieldName: { value: "Sample_UID", label: "Name" },
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Sample_UID: z.string(),
          Name: z.string(),
        })
      ),
    }),
  },
  BoxSampleDelete: {
    url: "/RequestPackage/BoxSampleDelete",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      sample_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  BoxListPrint: {
    url: "/RequestPackage/BoxListPrint",
    type: z.object({
      package_UID: z.string(),
    }),
    Item: z.object({
      Production_Method: z.string(),
      Sample_Type: z.string(),
      name: z.string(),
      Box_Type: z.string(),
      Box_Data: z.string(),
      Sample_Code: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Production_Method: z.string(),
          Sample_Type: z.string(),
          name: z.string(),
          Box_Type: z.string(),
          Box_Data: z.string(),
          Sample_Code: z.string(),
        })
      ),
    }),
  },
  BoxDelete: {
    url: "/RequestPackage/BoxDelete",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  LabBoxGetAvailableList: {
    url: "/RequestPackage/LabBoxGetAvailableList",
    type: z.object({
      package_UID: z.string(),
    }),
    fieldName: { value: "UID", label: "Name" },
    response: generalResponseZod.extend({
      data: z.array(z.object({ UID: z.string(), Name: z.string() })),
    }),
  },
  LabList: {
    url: "/RequestPackage/LabList",
    fieldName: { value: "Uid", label: "Name" },
    type: z.object({
      package_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Name: z.string(),
          Uid: z.string(),
        })
      ),
    }),
  },
  LabBoxList: {
    url: "/RequestPackage/LabBoxList",
    type: z.object({
      package_UID: z.string(),
      lab_UID: z.string(),
    }),
    item: BoxListItem,
    response: generalResponseZod.extend({
      data: z.array(BoxListItem),
    }),
  },
  LabBoxAdd: {
    url: "/RequestPackage/LabBoxAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      lab_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  LabBoxSampleGetAvailableList: {
    url: "/RequestPackage/LabBoxSampleGetAvailableList",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      lab_UID: z.string(),
    }),
    fieldName: { value: "Sample_UID", label: "Name" },
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Sample_UID: z.string(),
          Name: z.string(),
        })
      ),
    }),
  },
  LabBoxSampleDelete: {
    url: "/RequestPackage/LabBoxSampleDelete",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      sample_UID: z.string(),
      lab_Uid: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  LabBoxDelete: {
    url: "/RequestPackage/LabBoxDelete",
    type: z.object({
      package_UID: z.string(),
      box_UIDID: z.string(),
      lab_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  LabBoxListPrint: {
    url: "/RequestPackage/LabBoxListPrint",
    type: z.object({
      package_UID: z.string(),
    }),
    Item: z.object({
      Production_Method: z.string(),
      Sample_Type: z.string(),
      name: z.string(),
      Sample_Code_Asli_Ghadim: z.string(),
      Sample_Code_Asli_Jadid: z.string(),
      Lab_Name: z.string(),
      Lab_Address: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Production_Method: z.string(),
          Sample_Type: z.string(),
          name: z.string(),
          Sample_Code_Asli_Ghadim: z.string(),
          Sample_Code_Asli_Jadid: z.string(),
          Lab_Name: z.string(),
          Lab_Address: z.string(),
        })
      ),
    }),
  },
  LabBoxSampleAdd: {
    url: "/RequestPackage/LabBoxSampleAdd",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string(),
      lab_UID: z.string(),
      sample_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  LabGetOTP: {
    url: "/RequestPackage/LabGetOTP",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  LabCheckOtp: {
    url: "/RequestPackage/LabCheckOtp",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string().optional(),
      otp: z.number({
        required_error: errorMessage.required,
        invalid_type_error: errorMessage.number_invalid,
      }),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  LabBox2List: {
    url: "/RequestPackage/LabBox2List",
    type: z.object({
      package_UID: z.string(),
    }),
    Item: LabBox2ListItem,
    response: generalResponseZod.extend({
      data: z.array(LabBox2ListItem),
    }),
  },
  LabSampleList: {
    url: "/RequestPackage/LabSampleList",
    fieldName: { value: "Sample_Code", label: "Sample_Code" },
    type: z.object({
      package_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({ Sample_Code: z.string() })),
    }),
  },
  LabSampleTestItemList: {
    url: "/RequestPackage/LabSampleTestItemList",
    type: z.object({ package_UID: z.string(), sample_Code: z.string() }),
    item: BoxListItem,
    response: generalResponseZod.extend({
      data: z.array(BoxListItem),
    }),
  },
  LabSampleTestItemDetailUpdate: {
    url: "/RequestPackage/LabSampleTestItemDetailUpdate",
    type: z.object({
      sample_Code: z.string(),
      test_Item_Result_UID: z.string(),
      result_Test: z.string(),
      result_Range: z.number(),
      result_Desc: z.string(),
      result_Min_Accept: z.number(),
      result_Max_Accept: z.number(),
      result_Renew_Unit_FK: z.number(),
      result_Renewable: z.number(),
      test_Factor_Standards: z.string(),
    }),
  },
  LabSampleTestItemDetail: {
    url: "/RequestPackage/LabSampleTestItemDetail",
    type: z.object({
      sample_Code: z.string(),
      test_Item_Result_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          method: z.array(z.object({ uid: z.string(), title: z.string() })),
          name: z.string().optional(),
          testMethod: z.string().optional(),
          testDuration: z.any(),
          measure_Id: z.number().optional(),
          result_Test: z.string().optional(),
          result_Range: z.number().optional(),
          result_Desc: z.string().optional(),
          result_Min_Accept: z.number().optional(),
          result_Max_Accept: z.number().optional(),
          result_Renew_Unit_FK: z.number().optional(),
          result_Renewable: z.number().optional(),
          test_Factor_Standards: z.any(),
        })
      ),
    }),
  },
  MaterialListDDL: {
    url: "/RequestPackage/MaterialListDDL",
    type: z.object({
      package_UID: z.string().optional(),
      part_UID: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  RequestPackagePartUpdateSchematic: {
    url: "/RequestPackage/RequestPackagePartUpdateSchematic",
    type: z.object({
      package_UID: z.string().uuid().optional(),
      part_UID: z.string().uuid(),
      file_Content_Base64: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  PartProductListDDl: {
    url: "/RequestPackage/PartProductListDDl",
    type: z.object({
      package_UID: z.string().uuid().optional(),
      part_UID: z.string().uuid().optional(),
      density: z.number(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
};

export { RequestPackageApi };
