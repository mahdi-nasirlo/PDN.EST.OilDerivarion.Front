import { generalResponseZod, notEmpty } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const BoxGPSGetPageItem = z.object({
  uid: z.string().uuid().optional(),
  code: z.number().optional(),
  capacity: z.number().optional(),
  stateName: z.string().optional(),
  stateId: z.number().optional(),
  device_Status: z.number().optional(),
});

const boxGPSApi = {
  BoxGPSGetPage: {
    url: "/BoxGPS/GetPage",
    type: z.object({
      code: z.string().optional(),
      device_Status: z.number().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BoxGPSGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BoxGPSGetPageItem),
      }),
    }),
  },

  BoxGPSGet: {
    url: "/BoxGPS/Get",
    type: z.object({
      uid: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        uid: z.string().uuid().optional(),
        code: z.number().optional(),
        capacity: z.number().optional(),
        stateName: z.string().optional(),
        stateId: z.number().optional(),
        device_Status: z.number().optional(),
      }),
    }),
  },
  BoxGPSCreate: {
    url: "/BoxGPS/Create",
    type: z.object({
      code: z.number({ required_error: errorMessage.required }),
      capacity: z.number({ required_error: errorMessage.required }),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      imei: z.string({ required_error: errorMessage.required }),
      device_Status: z.number({
        required_error: errorMessage.required_choice,
      }),
      stateUid: z.string({
        required_error: errorMessage.required_choice,
      }),
    }),
  },

  BoxGPSUpdate: {
    url: "/BoxGPS/Update",
    type: z.object({
      uid: z.string().uuid(),
      code: z.number({ required_error: errorMessage.required }),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      device_Status: z.number({
        required_error: errorMessage.required_choice,
      }),
      stateUid: z.string().optional(),
      capacity: z.number().optional(),
      imei: z.string().optional(),
    }),
  },

  BoxGPSDelete: {
    url: "/BoxGPS/Delete",
    type: z.object({
      uid: z.string().uuid(),
      descripton: z.string({ required_error: errorMessage.required }),
      status: z.number({ required_error: errorMessage.required_choice }),
      test: z.boolean().optional(),
    }),
  },

  GetAllStatusBox: {
    url: "/BoxGPS/GetAllStatus",
    sortBy: "name",
    fieldNames: { value: "id", label: "name" },
    Item: z.object({
      id: z.string().uuid().optional(),
      name: z.number().optional(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          id: z.string().optional(),
          name: z.number().optional(),
        })
      ),
    }),
  },

  BoxGPSGetPageForExpert: {
    url: "/BoxGPS/GetPageForExpert",
    type: z.object({
      code: z.string().optional(),
      device_Status: z.number().optional(),
      fromRecord: z.number(),
      selectRecord: z.number(),
    }),
    item: BoxGPSGetPageItem,
    response: generalResponseZod.extend({
      data: z.object({
        count: z.number(),
        records: z.array(BoxGPSGetPageItem),
      }),
    }),
  },

  BoxGPSUpdateForExpert: {
    url: "/BoxGPS/Update",
    type: z.object({
      uid: z.string().uuid(),
      stateUid: z.string().optional(),
      imei: z.string().optional(),
      capacity: z.number().optional(),
      code: z.number(),
      name: z.string({ required_error: errorMessage.required }).pipe(notEmpty),
      device_Status: z.number({
        required_error: errorMessage.required_choice,
      }),
    }),
  },
};

export { boxGPSApi };
