import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const RequestPackageReportListItem = z.object({
    uid: z.string().nullable(),
    Form_Key: z.string(),
    Form_Type: z.number(),
    Form_Name: z.string()
})

const RequestPackageApi = {
    RequestPackageFinalization: {
        url: "/RequestPackage/RequestPackageFinalization"
    },
    RequestPackageReportList: {
        url: "/RequestPackage/RequestPackageReportList",
        type: z.object({
            step_Key: z.string(),
            package_UID: z.string().uuid().optional()
        }),
        item: RequestPackageReportListItem,
        response: generalResponseZod.extend({
            data: z.array(RequestPackageReportListItem)
        })
    }
}

export {RequestPackageApi}