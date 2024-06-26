import { z } from "zod";
import { generalResponseZod, notEmpty } from "@/types/api-response";
import { errorMessage } from "./error-message";
import Item from "antd/es/list/Item";

const LabResult = z.object({
  Sample_Name: z.string(),
  Package_ID: z.number(),
  Sample_ID: z.number(),
  Is_Product: z.boolean(),
  Sample_Type_Value: z.string(),
  Sample_Type: z.number(),
  Test_Item_Count: z.number(),
  Name: z.string(),
  Title: z.string(),
  Result_Test: z.string(),
  Result_Range: z.number(),
  Result_Desc: z.string(),
  Result_Min_Accept: z.number(),
  Result_Max_Accept: z.number(),
  Result_Renew_Unit_FK: z.number(),
  Result_Renewable: z.number(),
  Material_Id: z.string().optional().nullable(),
  Material_Supply_Method_Id: z.string().optional().nullable(),
  Material_Unit_Consumption: z.string().optional().nullable(),
  Material_Import_Declaration_Number: z.string().optional().nullable(),
  Material_Supply_Name: z.string().optional().nullable(),
  Material_Supply_Person_Type_Id: z.string().optional().nullable(),
  Material_Supply_National_Code: z.string().optional().nullable(),
  Material_Supply_Iran_Code: z.string().optional().nullable(),
  Material_Supply_Address: z.string().optional().nullable(),
  Material_Usage_Percentage: z.string().optional().nullable(),
});

const RequestPackageReportListItem = z.object({
  UID: z.string().nullable(),
  Form_Key: z.string(),
  Form_Type: z.number(),
  Form_Name: z.string(),
});
const boxForOpen = z.object({
  box_usage_type: z.number(),
  box_UID: z.string(),
  Capacity: z.number(),
  box_info: z.string(),
  Device_Status: z.number(),
  IMEI: z.string(),
  Is_Opened: z.boolean().optional(),
});

const VisitScheduleListItem = z.object({
  visit_Type: z.number(),
  package_UID: z.string().uuid(),
  naft_1: z.string(),
  naft_2: z.string(),
  naft_3: z.string(),
  naft_description: z.string().nullable(),
  naft_visit_modify_date_time: z.string(),
  samt_1: z.string(),
  samt_2: z.string(),
  samt_3: z.string(),
  samt_description: z.string().nullable(),
  samt_visit_modify_date_time: z.string(),
  est_1: z.string(),
  est_2: z.string(),
  est_3: z.string(),
  est_description: z.string(),
  est_visit_modify_date_time: z.string(),
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
  box_info: z.string(),
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
      naft_description: z.string().max(500),
      samt_1: z.string(),
      samt_2: z.string(),
      samt_3: z.string(),
      samt_description: z.string().max(500),
      est_1: z.string(),
      est_2: z.string(),
      est_3: z.string(),
      est_description: z.string().max(500),
      final_time: z.string(),
      final_description: z.string().max(500),
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
      naft_visit_modify_date_time: z.string(),
    }),
    form2: z.object({
      samt_1: z.string(),
      samt_2: z.string(),
      samt_3: z.string(),
      samt_description: z.string().nullable(),
      samt_visit_modify_date_time: z.string(),
    }),
    form3: z.object({
      est_1: z.string(),
      est_2: z.string(),
      est_3: z.string(),
      est_description: z.string(),
      est_visit_modify_date_time: z.string(),
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

      naft_opinion_1: z.string().max(500),
      is_naft_peresent: z.boolean(),

      samt_opinion_1: z.string().max(500),
      is_samt_peresent: z.boolean(),

      est_opinion_1: z.string().max(500),
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

      naft_opinion_2: z.string().max(500),

      samt_opinion_2: z.string().max(500),

      est_opinion_3: z.string().max(500),
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
      naft_opinion_description: z.string().max(500),
      samt_Opinion_ID: z.number(),
      samt_opinion_description: z.string().max(500),
      est_Opinion_ID: z.number(),
      est_opinion_description: z.string().max(500),
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
      Sample_Type: z.string(),
      name: z.string(),
      Box_Type: z.string(),
      Box_Data: z.string(),
      Sample_Code: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
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
      data: z.array(
        z.object({ Sample_Code: z.string(), Lab_Is_Finished: z.boolean() })
      ),
    }),
  },
  LabSampleTestItemList: {
    url: "/RequestPackage/LabSampleTestItemList",
    type: z.object({ package_UID: z.string(), sample_Code: z.string() }),
    item: z.object({
      Sample_Code: z.string().uuid(),
      test_Item_Result_UID: z.string().uuid().optional(),
      Name: z.string().optional(),
      Test_Item_Count: z.number().optional(),
      Is_Recorded: z.boolean().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          test_Item_Result_UID: z.string().uuid(),
          Name: z.string(),
          Test_Item_Count: z.number(),
          Is_Recorded: z.boolean().optional(),
        })
      ),
    }),
  },
  LabSampleTestItemDetailUpdate: {
    url: "/RequestPackage/LabSampleTestItemDetailUpdate",
    response: generalResponseZod,
    type: z.object({
      package_UID: z.string().uuid(),
      sample_Code: z.string().uuid(),
      test_Item_Result_UID: z.string().uuid(),
      result_Test: z
        .string({ required_error: errorMessage.required })
        .max(50)
        .pipe(notEmpty),
      result_Range: z.number(),
      result_Desc: z
        .string({ required_error: errorMessage.required })
        .max(50)
        .pipe(notEmpty),
      result_Min_Accept: z.number(),
      result_Max_Accept: z.number(),
      result_Renew_Unit_FK: z.number(),
      result_Renewable: z.number(),
      test_Factor_Standards: z
        .string({ required_error: errorMessage.required })
        .pipe(notEmpty),
    }),
  },

  LabSampleTestItemDetail: {
    url: "/RequestPackage/LabSampleTestItemDetail",
    type: z.object({
      package_UID: z.string().uuid(),
      sample_Code: z.string().uuid(),
      test_Item_Result_UID: z.string().uuid(),
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
          test_Factor_Standards: z.string(),
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
  LabSampleTestItemDetailFinalUpdate: {
    url: "/RequestPackage/LabSampleTestItemDetailFinalUpdate",
    type: z.object({
      package_UID: z.string(),
      sample_Code: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  PaymentPostAdd: {
    url: "/RequestPackage/PaymentPostAdd",
    type: z.object({
      package_UID: z.string(),
      amount: z
        .number({
          required_error: errorMessage.required,
          invalid_type_error: errorMessage.number_invalid,
        })
        .positive(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },

  PaymentPostList: {
    url: "/RequestPackage/PaymentPostList",
    type: z.object({
      package_UID: z.string().uuid(),
    }),
    item: z.object({
      UID: z.string().uuid().optional(),
      Amount: z.number().optional(),
      Create_DT: z.string().optional(),
      Is_Paid: z.boolean().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string().uuid().optional(),
          Amount: z.number().optional(),
          Create_DT: z.string().optional(),
          Is_Paid: z.boolean().optional(),
        })
      ),
    }),
  },
  PaymentPostDelete: {
    url: "/RequestPackage/PaymentPostDelete",
    type: z.object({
      package_UID: z.string().uuid(),
      payment_UID: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  PaymentList: {
    url: "/RequestPackage/PaymentList",
    type: z.object({
      package_UID: z.string().uuid(),
    }),
    item: z.object({
      UID: z.string().uuid(),
      Amount: z.number().optional(),
      Create_DT: z.string().optional(),
      Description: z.string().optional(),
      Payment_Type: z.number(),
      Is_Paid: z.boolean().optional(),
      Paid_DT: z.string().optional(),
      Is_Used: z.string().optional(),
      Used_DT: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UID: z.string().uuid(),
          Amount: z.number().optional(),
          Create_DT: z.string().optional(),
          Description: z.string().optional(),
          Payment_Type: z.number(),
          Is_Paid: z.boolean().optional(),
          Paid_DT: z.string().optional(),
          Is_Used: z.string().optional(),
          Used_DT: z.string().optional(),
        })
      ),
    }),
  },

  PaymentPaid: {
    url: "/RequestPackage/PaymentPaid",
    type: z.object({
      package_UID: z.string().uuid(),
      payment_UID: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },

  LabReport: {
    url: "/RequestPackage/LabReport",
    type: z.object({
      package_UID: z.string().uuid(),
    }),
    Item: LabResult,
    response: generalResponseZod.extend({
      data: z.array(LabResult),
    }),
  },
  report: {
    url: "/RequestPackage/Report",
    type: z.object({
      report_Name: z.string(),
    }),
    productcode:z.array(z.object({ Product_Name: z.string(), Tedad: z.number() })),
    paymentPie:z
        .array(
          z.object({
            Type_1: z.number(),
            Type_2: z.number(),
            Type_3: z.number(),
            Type_4: z.number(),
          })
        )
        .length(1)
  },
  BoxDeviceListForOpen: {
    url: "/RequestPackage/BoxDeviceListForOpen",
    type: z.object({
      package_UID: z.string(),
    }),
    Item: boxForOpen,
    response: generalResponseZod.extend({
      data: z.array(boxForOpen),
    }),
  },
  BoxDeviceOpen: {
    url: "/RequestPackage/BoxDeviceOpen",
    type: z.object({
      package_UID: z.string(),
      box_UID: z.string().uuid(),
    }),
    // Item: boxForOpen,
    response: generalResponseZod.extend({
      data: z.array(z.any()),
    }),
  },
  GetReportSetad: {
    url: "/RequestPackage/GetReportSetad",
    type: z.object({
        taskId: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({
          headers: z.array(z
            .object({
              Col_Name: z.string()
            })),
          values: z
            .array(z.any())
      }))
    })
  }
};

export { RequestPackageApi };
