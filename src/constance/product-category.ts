import { generalResponseZod, notEmpty } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const BasicProductCategoryGetPageItem = z.object({
  uid: z.string().uuid().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  productionMethodName: z.string().optional(),
  densityTypeName: z.string().optional(),
  densityTypeId: z.number().optional(),
  smallCode: z.number().optional(),
  hasDensity: z.boolean().optional(),
  densityUpperLimit: z.number().optional(),
  densityLowerLimit: z.number().optional(),
  testMethod: z.string().optional(),
});

const BasicProductCategoryListItem = z.object({
  id: z.number().optional(),
  uid: z.string().uuid().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  productionMethodName: z.string().optional(),
  productionMethodId: z.number().optional(),
  densityTypeName: z.string().optional(),
  densityTypeId: z.number().optional(),
  smallCode: z.number().optional(),
  hasDensity: z.boolean().optional(),
  densityUpperLimit: z.number().optional(),
  densityLowerLimit: z.number().optional(),
});

const BasicProductCategoryGetItem = z.object({
  uid: z.string().uuid().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  productionMethodName: z.string().optional(),
  productionMethodId: z.number().optional(),
  densityTypeName: z.string().optional(),
  densityTypeId: z.number().optional(),
  smallCode: z.number().optional(),
  hasDensity: z.boolean().optional(),
  densityUpperLimit: z.number().optional(),
  densityLowerLimit: z.number().optional(),
});

const productCategoryApi = {
  BasicProductCategoryList: {
    url: "/Basic/BasicProductCategoryList",
    sortBy: "name",
    fieldNames: { value: "uid", label: "name" },
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
    item: BasicProductCategoryListItem,
    response: generalResponseZod.extend({
      data: z.array(BasicProductCategoryListItem),
    }),
  },

  BasicProductCategoryGetPage: {
    url: "/Basic/BasicProductCategoryGetPage",
    type: z.object({
      name: z.string().max(50).optional(),
      isActive: z.boolean().optional(),
      hasDensity: z.boolean().optional(),
      densityTypeId: z.number().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicProductCategoryGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BasicProductCategoryGetPageItem),
      }),
    }),
  },

  BasicProductCategoryGet: {
    url: "/Basic/BasicProductCategoryGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    item: BasicProductCategoryGetItem,
    response: generalResponseZod.extend({
      data: z.array(BasicProductCategoryGetItem),
    }),
  },

  BasicProductCategoryCreate: {
    url: "/Basic/BasicProductCategoryCreate",
    type: z.object({
      name: z
        .string({ required_error: errorMessage.required })
        .max(50)
        .pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      productionMethodId: z.number({
        required_error: errorMessage.required_choice,
      }),
      smallCode: z.number({ required_error: errorMessage.number_invalid }),
      hasDensity: z.boolean({ required_error: errorMessage.required_choice }),
      densityUpperLimit: z.number().optional(),
      densityLowerLimit: z.number().optional(),
    }),
  },

  BasicProductCategoryUpdate: {
    url: "/Basic/BasicProductCategoryUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z
        .string({ required_error: errorMessage.required })
        .max(50)
        .pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      productionMethodId: z.number({
        required_error: errorMessage.required_choice,
      }),
      smallCode: z.number({ required_error: errorMessage.number_invalid }),
      hasDensity: z.boolean({ required_error: errorMessage.required_choice }),
      densityUpperLimit: z.number().optional(),
      densityLowerLimit: z.number().optional(),
    }),
  },

  BasicProductCategoryDelete: {
    url: "/Basic/BasicProductCategoryDelete",
    type: z.object({
      uid: z.string().uuid(),
    }),
  },
};

export { productCategoryApi };
