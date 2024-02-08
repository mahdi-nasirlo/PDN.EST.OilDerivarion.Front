import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";
import { errorMessage } from "./error-message";

const BoxGPSGetPageItem = z.object({
    uid: z.string().uuid().optional(),
    code: z.number().optional(),
    capacity: z.number().optional(),
    is_Active: z.boolean().optional(),
    stateName: z.string().optional(),
    stateId: z.number().optional(),
});

const boxGPSApi = {

    BoxGPSGetPage: {
        url: "/BoxGPS/GetPage",
        type: z.object({
            code: z.string().optional(),
            isActive: z.boolean().optional(),
            fromRecord: z.number(),
            selectRecord: z.number(),
        }),
        item: BoxGPSGetPageItem,
        response: generalResponseZod.extend({
            // data: z.object({
            //     // count: z.number(),
            //     records: z.array(BoxGPSGetPageItem),
            // }),
            data:  z.array(BoxGPSGetPageItem)
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
                is_Active: z.boolean().optional(),
                stateName: z.string().optional(),
                stateId: z.number().optional(),
            }),
        }),
    },
    BoxGPSCreate: {
        url: "/BoxGPS/Create",
        type: z.object({
            code: z.number({ required_error: errorMessage.required }),
            capacity: z.number({ required_error: errorMessage.required }),
            name: z.string({ required_error: errorMessage.required }),
            imei: z.string({ required_error: errorMessage.required }),
            isActive: z.boolean({ required_error: errorMessage.required_choice }),
            stateUId: z.string({
                required_error: errorMessage.required_choice,
            }),
        }),
    },

    BoxGPSUpdate: {
        url: "/BoxGPS/Update",
        type: z.object({
            uid: z.string().uuid().optional(),
            capacity: z.number({ required_error: errorMessage.required }).optional(),
            name: z.string({ required_error: errorMessage.required }).optional(),
            imei: z.string({ required_error: errorMessage.required }).optional(),
            // isActive: z.boolean({ required_error: errorMessage.required_choice }),
            stateUId: z.string({
                required_error: errorMessage.required_choice,
            }).optional(),
        }),
    },

    BoxGPSDelete: {
        url: "/BoxGPS/Delete",
        type: z.object({
            uid: z.string().uuid(),
        }),
    },
};

export { boxGPSApi };
