import { z } from "zod";
import { errorMessage } from "./error-message";
import { generalResponseZod, notEmpty } from "@/types/api-response";

const BasicProductListItem = z.object({
  uid: z.string().uuid().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  materials: z.array(z.string()).optional(),
  testItems: z.array(z.string()).optional(),
  productCategoryName: z.string().optional(),
  fullName: z.string().optional(),
});

const BasicProductGetPageItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  materials: z.string(),
  testItems: z.string(),
  productCategoryName: z.number(),
  productCategoryUid: z.string(),
});

const BasicProductGetItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  materials: z
    .array(z.object({ uid: z.string(), name: z.string() }))
    .optional(),
  testItems: z
    .array(z.object({ uid: z.string(), name: z.string() }))
    .optional(),
  productCategoryName: z.number(),
  productCategoryUid: z.string(),
});

const productApi = {
  BasicProductList: {
    url: "/Basic/ProductList",
    sortBy: "name",
    fieldNames: { value: "uid", label: "name" },
    item: BasicProductListItem,
    response: generalResponseZod.extend({
      data: z.array(BasicProductListItem),
    }),
  },

  BasicProductGetPage: {
    url: "/Basic/ProductGetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicProductGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BasicProductGetPageItem),
      }),
    }),
  },

  BasicProductGet: {
    url: "/Basic/ProductGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    item: BasicProductGetItem,
    response: generalResponseZod.extend({
      data: BasicProductGetItem,
    }),
  },

  BasicProductCreate: {
    url: "/Basic/ProductCreate",
    type: z.object({
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      productCategoryUid: z.string({
        required_error: errorMessage.required_choice,
      }),
      materials: z.array(z.string()).optional(),
      testItems: z.array(z.string()).optional(),
    }),
  },

  BasicProductUpdate: {
    url: "/Basic/ProductUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      productCategoryUid: z.string({
        required_error: errorMessage.required_choice,
      }),
      materials: z.array(z.string()).optional(),
      testItems: z.array(z.string()).optional(),
    }),
  },

  BasicProductDelete: {
    url: "/Basic/ProductDelete",
    type: z.object({
      uid: z.string().uuid(),
    }),
  },
};

export { productApi };
