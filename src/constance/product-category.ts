import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

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

const BasicProductCategoryGet = z.object({
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
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      hasDensity: z.boolean().optional(),
      densityTypeId: z.number().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicProductCategoryGetPageItem,
    response: generalResponseZod.extend({
      data: z.array(BasicProductCategoryGetPageItem),
    }),
  },

  BasicProductCategoryGet: {
    url: "/Basic/BasicProductCategoryGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    item: BasicProductCategoryGet,
    response: generalResponseZod.extend({
      data: z.array(BasicProductCategoryGet),
    }),
  },

  BasicProductCategoryCreate: {
    url: "/Basic/BasicProductCategoryCreate",
    type: z.object({
      name: z.string(),
      isActive: z.boolean(),
      productionMethodId: z.number(),
      smallCode: z.number(),
      hasDensity: z.boolean(),
      densityUpperLimit: z.number().optional(),
      densityLowerLimit: z.number().optional(),
    }),
  },

  BasicProductCategoryUpdate: {
    url: "/Basic/BasicProductCategoryUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string(),
      isActive: z.boolean(),
      productionMethodId: z.number(),
      smallCode: z.number(),
      hasDensity: z.boolean(),
      densityUpperLimit: z.number().optional(),
      densityLowerLimit: z.number().optional(),
    }),
  },
};

export { productCategoryApi };
