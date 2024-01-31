import {generalResponseZod} from "@/types/api-response";
import {z} from "zod";
import {errorMessage} from "./error-message";

const GetRequestPackagePartListItem = z.object({
    UID: z.string(),
    Part_Type_Value: z.string(),
    Part_Type: z.enum(["1", "2", "3", "4", "5"]),
    Status: z.boolean()
})

const MaterialGetAllItem = z.object({
    uid: z.string().uuid(),
    name: z.string(),
    isActive: z.boolean(),
    measureUid: z.string(),
    measureName: z.string()
})

const materialApi = {
    MaterialGetAll: {
        url: "/Material/MaterialGetAll",
        item: MaterialGetAllItem,
        fieldNames: {label: "name", value: "uid"},
        response: generalResponseZod.extend({
            data: z.array(MaterialGetAllItem)
        })
    },
    RequestPackageList: {
        url: "/Material/RequestPackageList",
    },
    GetRequestPackagePartList: {
        url: "/Material/GetRequestPackagePartList",
        item: GetRequestPackagePartListItem,
        response: generalResponseZod.extend({
            data: z.array(GetRequestPackagePartListItem)
        }),
    },
    RequestPackagePartAdd: {
        url: "/Material/RequestPackagePartAdd",
        type: z.object({
            part_Type: z.enum(["1", "2", "3", "4", "5"], {
                required_error: errorMessage.required_choice
            }),
            package_UID: z.string().optional()

        })
    },
    RequestPackageMaterialAdd: {
        url: "/Material/RequestPackageMaterialAdd",
        item: z.object({
            name: z.string()
        }),
        type: z.object({
            request__Package_UID: z.string({required_error: errorMessage.required_choice}),
            material_Uid: z.string()
        })
    },
    GetAllRequestPackageRegisteredMaterial: {
        url: "/Material/GetAllRequestPackageRegisteredMaterial",
        type: z.object({
            package_UID: z.string().uuid().optional()
        })
    }
}

export {materialApi}