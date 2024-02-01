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
    measureName: z.string(),
  
})

const BasicProductMaterialList = z.object({
    uid:z.string().uuid(),
    name:z.string(),
    isActive:z.boolean(),
    measureName:z.string(),
    TestItems:z.string()
})
 
const BasicTestItemList =z.object({
    name:z.string().optional(),
    isActive:z.boolean().optional(),
    measureUid:z.string().uuid().optional(),
    measureName:z.string().optional(),
    testDuration:z.string().optional(),
    uid:z.string().uuid().optional(),
    testMethod:z.string().optional(),
    measure_Id:z.number().optional()
})
const BasicMeasureList = z.object({
    Uid:z.string().uuid(),
    Name:z.string(),
    IsActive:z.boolean(),    
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
        response: generalResponseZod.extend({
            data: z.array(GetRequestPackagePartListItem)
        }),
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
    },
    BasicProductMaterialList: {
        url: "/Basic/BasicProductMaterialList",
        Item:BasicProductMaterialList,
        type:z.object({
            // name:z.null(),
            isActive:z.boolean() }),
        response: generalResponseZod.extend({
         data: z.array(BasicProductMaterialList)
        }),
    },
    BasicProductMaterialCreate: {
        url: "/Basic/BasicProductMaterialCreate",
        // Item:BasicProductMaterialList,
        type:z.object({
            name:z.string({required_error:errorMessage.required}),
            isActive:z.boolean(),
            measureUid:z.string().uuid(),
            testItems:z.array(z.object({
            })) 
        }),
    },
    BasicTestItemList: {
        url: "/Basic/BasicTestItemList",
        type:z.object({
            name:z.string(),
            isActive:z.boolean(),
        }),
        Item:BasicTestItemList,
        response: generalResponseZod.extend({
            data: z.array(BasicTestItemList)
           }),
        
    },
    BasicMeasureList: {
        url: "/Basic/BasicMeasureList",
        sortBy:"Name",
        fieldNames: { value: "Uid", label: "Name" },
        type:z.object({
            name:z.null(),
            isActive:z.boolean(),
        }),
        
        Item:BasicMeasureList,
        response: generalResponseZod.extend({
            data: z.array(BasicMeasureList)
           }),
        
    },
    BasicProductMaterialGet: {
        url: "/Basic/BasicProductMaterialGet",
        type:z.object({
         uid:z.string().uuid()   
        }),
        response: generalResponseZod.extend({
            data:z.object({
                    uid:z.string().uuid(),
                    name:z.string(),
                    isActive:z.boolean(),
                    measureUid:z.string().uuid(),
                    measureName:z.string(),
                    TestItems:z.string()
                })
           }),
        
    },
}

export {materialApi}