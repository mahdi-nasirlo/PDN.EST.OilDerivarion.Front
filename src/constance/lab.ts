import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const LabGetPage = z.object({
  uid: z.string(),
  name: z.string(),
  isActive: z.boolean(),
  license_No: z.string(),
  licenseExpireDatePersian: z.string(),
  tel: z.string(),
  address: z.string(),
  fax: z.string(),
  stateName: z.string(),
  testItems: z.array(z.object({ name: z.string(), uid: z.string().uuid() })),
});

const labApi = {
  LabGetPage: {
    url: "/Lab/GetPage",
    type: z.object({
      name: z.string().optional(),
      isActive: z.boolean().optional(),
      stateId: z.number().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    Item: LabGetPage,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(LabGetPage),
      }),
    }),
  },

  LabCreate: {
    url: "/Lab/Create",
    type: z.object({
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required }),
      stateId: z.number(),
      license_No: z.string({ required_error: errorMessage.required }),
      licenseExpireDatePersian: z.string({
        required_error: errorMessage.required,
      }),
      tel: z.string({ required_error: errorMessage.required }),
      fax: z.string({ required_error: errorMessage.required }),
      address: z.string({ required_error: errorMessage.required }),
      testItems: z.array(z.object({})),
    }),
  },
  LabGet: {
    url: "/Lab/Get",
    type: z.object({
      uid: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        name: z.string(),
        isActive: z.boolean(),
        stateId: z.number(),
        license_No: z.string(),
        licenseExpireDatePersian: z.string(),
        tel: z.string(),
        fax: z.string(),
        address: z.string(),
        testItems: z.array(z.object({})),
      }),
    }),
  },
  LabUpdate: {
    url: "/Lab/Update",
    type: z.object({
      uid: z.string().uuid(),
      name: z.string({ required_error: errorMessage.required }),
      isActive: z.boolean({ required_error: errorMessage.required }),
      stateId: z.number(),
      license_No: z.string({ required_error: errorMessage.required }),
      licenseExpireDatePersian: z.string({
        required_error: errorMessage.required,
      }),
      tel: z.string({ required_error: errorMessage.required }),
      fax: z.string({ required_error: errorMessage.required }),
      address: z.string({ required_error: errorMessage.required }),
      testItems: z.array(z.object({})),
    }),
  },

  LabDelete: {
    url: "/Lab/Delete",
    type: z.object({
      uid: z.string().uuid(),
    }),
  },
};
export default labApi;
