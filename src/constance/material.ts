import { generalResponseZod, notEmpty } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const GetRequestPackagePartListItem = z.object({
  UID: z.string(),
  Part_Type_Value: z.string(),
  Part_Type: z.enum(["1", "2", "3", "4", "5"]),
  Status: z.boolean(),
  Products: z.string().or(
    z.array(
      z.object({
        Estehsal: z.number(),
        HadarRaft: z.number(),
        name: z.string(),
        UID: z.string(),
        Part_ID: z.number(),
      })
    )
  ),
});

const MaterialGetAllItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measureUid: z.string(),
  measureName: z.string(),
});

const BasicProductMaterialGetItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measureUid: z.string().uuid(),
  measureName: z.string(),
  testItems: z.array(
    z
      .object({
        name: z.string(),
        uid: z.string(),
      })
      .optional()
  ),
});

const BasicProductMaterialList = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measureName: z.string(),
  testItems: z.string(),
});
const BasicProductMaterialGetPageItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measureName: z.string(),
  testItems: z
    .array(z.object({ uid: z.string(), name: z.string() }).optional())
    .optional(),
});

const GetAllRequestPackageRegisteredMaterialItem = z.object({
  uid: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  measureUid: z.string(),
  measureName: z.string(),
});

const RequestPackageMaterialListItem = z.object({
  Id: z.number(),
  Uid: z.string(),
  Material_Name: z.string(),
  TestItems: z.string(),
});

const RequestPackagePartMaterialListItem = z.object({
  UID: z.string(),
  material_name: z.string(),
  Estefadeh: z.string(),
});

const RequestPackagePartProductListItem = z.object({
  UID: z.string(),
  material_name: z.string(),
  Estefadeh: z.string(),
});

const GetRegisteredReportsForStepByKeyItem = z.object({
  UID: z.string(),
  Form_Name: z.string(),
  Form_Key: z.string(),
  Form_Type: z.number(),
  Is_Report: z.boolean(),
  Step_Key: z.string(),
  ID: z.string(),
});

const materialApi = {
  MaterialGetAll: {
    url: "/Material/MaterialGetAll",
    item: MaterialGetAllItem,
    fieldNames: { label: "name", value: "uid" },
    response: generalResponseZod.extend({
      data: z.array(MaterialGetAllItem),
    }),
  },
  BasicProductMaterialGetPage: {
    url: "/Basic/BasicProductMaterialGetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicProductMaterialGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BasicProductMaterialGetPageItem),
      }),
    }),
  },
  RequestPackageList: {
    url: "/Material/RequestPackageList",
  },
  GetRequestPackagePartList: {
    url: "/Material/GetRequestPackagePartList",
    item: GetRequestPackagePartListItem,
    response: generalResponseZod.extend({
      data: z.array(GetRequestPackagePartListItem),
    }),
  },
  RequestPackagePartAdd: {
    url: "/Material/RequestPackagePartAdd",
    response: generalResponseZod.extend({
      data: z.array(GetRequestPackagePartListItem),
    }),
    type: z.object({
      part_Type: z.enum(["1", "2", "3", "4", "5"], {
        required_error: errorMessage.required_choice,
      }),
      package_UID: z.string().optional(),
    }),
  },
  RequestPackageMaterialAdd: {
    url: "/Material/RequestPackageMaterialAdd",
    item: z.object({
      name: z.string(),
    }),
    type: z.object({
      request__Package_UID: z
        .string({
          required_error: errorMessage.required_choice,
        })
        .optional(),
      material_Uid: z.string({ required_error: errorMessage.required }),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  GetAllRequestPackageRegisteredMaterial: {
    url: "/Material/GetAllRequestPackageRegisteredMaterial",
    sortBy: "name",
    fieldNames: { value: "uid", label: "name" },
    type: z.object({
      package_UID: z.string().uuid().optional(),
    }),
    item: GetAllRequestPackageRegisteredMaterialItem,
    response: generalResponseZod.extend({
      data: z.array(GetAllRequestPackageRegisteredMaterialItem),
    }),
  },
  BasicProductMaterialList: {
    url: "/Basic/BasicProductMaterialList",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
    Item: BasicProductMaterialList,
    response: generalResponseZod.extend({
      data: z.array(BasicProductMaterialList),
    }),
  },
  BasicProductMaterialCreate: {
    url: "/Basic/BasicProductMaterialCreate",
    // Item:BasicProductMaterialList,
    type: z.object({
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required }).uuid(),
      testItems: z.array(z.string()).min(1),
    }),
  },

  BasicProductMaterialGet: {
    url: "/Basic/BasicProductMaterialGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    Item: BasicProductMaterialGetItem,
    response: generalResponseZod.extend({
      data: z.array(BasicProductMaterialGetItem),
    }),
  },
  BasicProductMaterialUpdate: {
    url: "/Basic/BasicProductMaterialUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required }).uuid(),
      testItems: z.array(z.string()).min(1),
    }),
  },
  RequestPackagePartDelete: {
    url: "/Material/RequestPackagePartDelete",
    type: z.object({
      part_UID: z.string(),
      package_UID: z.string().optional(),
    }),
  },
  RequestPackageDelete: {
    url: "/Material/RequestPackagePartDelete",
    type: z.object({
      part_UID: z.string(),
      package_UID: z.string(),
    }),
  },
  RequestPackageMaterialDelete: {
    url: "/Material/RequestPackageMaterialDelete",
    type: z.object({
      request__Package_UID: z.string().optional(),
      material_Uid: z.string(),
    }),
  },
  RequestPackageMaterialList: {
    url: "/Material/RequestPackageMaterialList",
    type: z.object({
      package_UID: z.string().optional(),
    }),
    item: RequestPackageMaterialListItem,
    response: generalResponseZod.extend({
      data: z.array(RequestPackageMaterialListItem),
    }),
  },
  BasicProductMaterialDelete: {
    url: "/Basic/BasicProductMaterialDelete",
    type: z.object({
      uid: z.string().uuid(),
    }),
  },
  RequestPackagePartMaterialList: {
    url: "/Material/RequestPackagePartMaterialList",
    type: z.object({
      part_UID: z.string(),
      package_UID: z.string().optional(),
    }),
    item: RequestPackagePartMaterialListItem,
    response: generalResponseZod.extend({
      data: z.array(RequestPackagePartMaterialListItem),
    }),
  },
  RequestPackagePartMaterialAdd: {
    url: "/Material/RequestPackagePartMaterialAdd",
    type: z.object({
      material_UID: z.string(),
      part_Type: z.number().optional(),
      part_UID: z.string(),
      package_UID: z.string().optional(),
      darsad_Estefadeh: z.number(),
    }),
    response: generalResponseZod.extend({
      data: z.array(RequestPackageMaterialListItem),
    }),
  },
  RequestPackagePartMaterialDelete: {
    url: "/Material/RequestPackagePartMaterialDelete",
    type: z.object({
      material_UID: z.string(),
      part_UID: z.string(),
      package_UID: z.string().optional(),
    }),
  },
  RequestPackagePartInfo: {
    url: "/Material/RequestPackagePartInfo",
    type: z.object({
      part_UID: z.ostring(),
      package_UID: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        Part_Type: z.number(),
        Status: z.number(),
        process_description: z.string(),
        schematic_file_UID: z.string().uuid().optional(),
      }),
    }),
  },
  RequestPackagePartProductList: {
    url: "/Material/RequestPackagePartProductList",
    type: z.object({
      part_UID: z.string(),
      package_UID: z.string().optional(),
    }),
    item: RequestPackagePartProductListItem,
    response: generalResponseZod.extend({
      data: z.array(RequestPackagePartProductListItem),
    }),
  },
  RequestPackagePartProductAdd: {
    url: "/Material/RequestPackagePartProductAdd",
    type: z.object({
      product_UID: z.string(),
      part_Type: z.number(),
      part_UID: z.string(),
      package_UID: z.string(),
      estehsal: z.number(),
      hadarRaft: z.number(),
    }),
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  RequestPackagePartProductDelete: {
    url: "/Material/RequestPackagePartProductDelete",
    type: z.object({
      product_UID: z.string(),
      part_UID: z.string(),
      package_UID: z.string().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
  RequestPackagePartUpdateProcessDescription: {
    url: "/Material/RequestPackagePartUpdateProcessDescription",
    type: z.object({
      part_UID: z.string(),
      package_UID: z.string().optional(),
      process_description: z.string(),
    }),
  },
  GetRegisteredReportsForStepByKey: {
    url: "/Basic/GetRegisteredReportsForStepByKey",
    type: z.object({
      step_Key: z.string(),
    }),
    item: GetRegisteredReportsForStepByKeyItem,
    response: generalResponseZod.extend({
      data: z.array(GetRegisteredReportsForStepByKeyItem),
    }),
    finalKey: "Producer_Request",
  },
};

export { materialApi };
