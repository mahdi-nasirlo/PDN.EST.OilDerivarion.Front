import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const BasicTestItemDetailGetPageItem = z.object({
  uid: z.string().uuid(),
  title: z.string(),
  isActive: z.boolean(),
  referenceCode: z.string(),
  testItemUid: z.string().uuid(),
  testItemName: z.string(),
});

const BasicTestItemDetailGetItem = z.object({
  uid: z.string().uuid().optional(),
  title: z.string().optional(),
  isActive: z.boolean().optional(),
  referenceCode: z.string().optional(),
  testItemUid: z.string().uuid().optional(),
  testItemName: z.string().optional(),
});

const TestItemDetailApi = {
  BasicTestItemDetailGetPage: {
    url: "/Basic/BasicTestItemDetailGetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BasicTestItemDetailGetPageItem,
    response: generalResponseZod.extend({
      data: z.array(BasicTestItemDetailGetPageItem),
    }),
  },

  BasicTestItemDetailGet: {
    url: "/Basic/BasicTestItemDetailGet",
    type: z.object({
      uid: z.string().uuid(),
    }),
    item: BasicTestItemDetailGetItem,
    response: generalResponseZod.extend({
      data: z.array(BasicTestItemDetailGetItem),
    }),
  },

  BasicTestItemDetailCreate: {
    url: "/Basic/BasicTestItemDetailCreate",
    type: z.object({
      title: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      testItemUid: z.string({ required_error: errorMessage.required_choice }),
      referenceCode: z.string({ required_error: errorMessage.required }),
    }),
  },

  BasicTestItemDetailUpdate: {
    url: "/Basic/BasicTestItemDetailUpdate",
    type: z.object({
      uid: z.string().uuid(),
      title: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required_choice }),
      referenceCode: z.string({ required_error: errorMessage.required }),
      testItemUid: z.string({ required_error: errorMessage.required_choice }),
    }),
  },
};

export { TestItemDetailApi };
