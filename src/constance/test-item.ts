import { z } from "zod";
import { generalResponseZod, notEmpty } from "@/types/api-response";
import { errorMessage } from "./error-message";

const BasicTestItemListItem = z.object({
  uid: z.string().uuid().optional(),
  name: z.string().optional(),
  isActive: z.boolean().optional(),
  measure_Id: z.number().optional(),
  measureUid: z.string().optional(),
  measureName: z.string().optional(),
  testMethod: z.string().optional(),
  testDuration: z.number().optional(),
});

const BasicTestItemGetPageItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measure_Id: z.number(),
  measureUid: z.string(),
  measureName: z.string(),
  testMethod: z.string(),
  testDuration: z.number(),
});

const BasicTestItemGetItem = z.object({
  uid: z.string().uuid(),
  name: z.string(),
  isActive: z.boolean(),
  measure_Id: z.number(),
  measureUid: z.string(),
  measureName: z.string(),
  testMethod: z.string(),
  testDuration: z.number(),
});

const TestItemApi = {
  BasicTestItemList: {
    url: "/Basic/BasicTestItemList",
    sortBy: "name",
    fieldNames: { value: "uid", label: "name" },
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
    }),
    item: BasicTestItemListItem,
    response: generalResponseZod.extend({
      data: z.array(BasicTestItemListItem),
    }),
  },

  BasicTestItemGetPage: {
    url: "/Basic/BasicTestItemGetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicTestItemGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BasicTestItemGetPageItem),
      }),
    }),
  },

  BasicTestItemGet: {
    url: "/Basic/BasicTestItemGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    item: BasicTestItemGetItem,
    response: generalResponseZod.extend({
      data: z.array(BasicTestItemGetItem),
    }),
  },

  BasicTestItemCreate: {
    url: "/Basic/BasicTestItemCreate",
    type: z.object({
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required_choice }),
      testDuration: z.number({ required_error: errorMessage.number_invalid }),
    }),
  },

  BasicTestItemUpdate: {
    url: "/Basic/BasicTestItemUpdate",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      measureUid: z.string({ required_error: errorMessage.required_choice }),
      testDuration: z.number({ required_error: errorMessage.number_invalid }),
    }),
  },

  BasicTestItemDelete: {
    url: "/Basic/BasicTestItemDelete",
    type: z.object({
      uid: z.string().uuid(),
    }),
  },
};

export { TestItemApi };
