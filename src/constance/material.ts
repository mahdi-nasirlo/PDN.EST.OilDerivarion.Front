import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const GetRequestPackagePartListItem = z.object({
  UID: z.string(),
  Part_Type_Value: z.string(),
  Part_Type: z.enum(["1", "2", "3", "4", "5"]),
  Status: z.boolean(),
});

const MaterialGetAllItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measureUid: z.string(),
  measureName: z.string(),
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
  testItems: z.string(),
});

const BasicTestItemList = z.object({
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  measureUid: z.string().uuid().optional(),
  measureName: z.string().optional(),
  testDuration: z.string().optional(),
  uid: z.string().uuid().optional(),
  testMethod: z.string().optional(),
  measure_Id: z.number().optional(),
});
const BasicMeasureList = z.object({
  Uid: z.string().uuid(),
  Name: z.string(),
  IsActive: z.boolean(),
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
      request__Package_UID: z.string({
        required_error: errorMessage.required_choice,
      }),
      material_Uid: z.string(),
    }),
  },
  GetAllRequestPackageRegisteredMaterial: {
    url: "/Material/GetAllRequestPackageRegisteredMaterial",
    type: z.object({
      package_UID: z.string().uuid().optional(),
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
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required }).uuid(),
      testItems: z.array(z.object({})),
    }),
  },
  BasicTestItemList: {
    url: "/Basic/BasicTestItemList",
    type: z.object({
      name: z.string(),
      isActive: z.boolean(),
    }),
    Item: BasicTestItemList,
    response: generalResponseZod.extend({
      data: z.array(BasicTestItemList),
    }),
  },
  BasicMeasureList: {
    url: "/Basic/BasicMeasureList",
    sortBy: "Name",
    fieldNames: { value: "uid", label: "name" },
    type: z.object({
      name: z.null(),
      isActive: z.boolean(),
    }),

    Item: BasicMeasureList,
    response: generalResponseZod.extend({
      data: z.array(BasicMeasureList),
    }),
  },
  BasicProductMaterialGet: {
    url: "/Basic/BasicProductMaterialGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          uid: z.string().uuid(),
          name: z.string(),
          isActive: z.boolean(),
          measureUid: z.string().uuid(),
          measureName: z.string(),
          testItems: z.array(
            z.object({
              name: z.string(),
              uid: z.string(),
            })
          ),
        })
      ),
    }),
  },
  BasicProductMaterialUpdate: {
    url: "/Basic/BasicProductMaterialUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required }).uuid(),
      testItems: z.array(z.object({})),
    }),
  },
};

export { materialApi };
