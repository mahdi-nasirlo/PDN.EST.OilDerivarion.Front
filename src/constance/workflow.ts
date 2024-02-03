import {generalResponseZod} from "@/types/api-response";
import {z} from "zod";

export const workflowApi = {
    dataTable: {
        response: generalResponseZod.extend({
            data: z.object({
                tasks: z.object({
                    Title: z.string(),
                    Model: z.any(),
                    Table: z.object({
                        Header: z.array(z.object({
                            Key: z.string(),
                            Value: z.string(),
                            Hidden: z.boolean()
                        })),
                        Values: z.array(z.any())
                    })
                }),
                step: z.array(z.object({
                    Step_id: z.string(),
                    Step_Name: z.string(),
                    Process_Id: z.string(),
                    Name: z.string(),
                    Step_Key: z.string(),
                    Counting_position: z.number(),
                    Roles_of_authorized_approvers: z.string(),
                    Users_of_authorized_approvers: z.string(),
                    Help_Text: z.string(),
                    Is_Finish: z.boolean(),
                    Is_Active: z.boolean(),
                    WorkTime: z.number(),
                    Creator_id: z.string()
                }))
            })
        })
    }
}