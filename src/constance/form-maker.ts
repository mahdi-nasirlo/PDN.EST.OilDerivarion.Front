import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const FormData = z.any().nullable()

const FormFieldDetails = z.object({
    Form_Filed_Detail_ID: z.string(),
    Form_Field_ID: z.string(),
    Value: z.string(),
    Text: z.string()
})

const FormFields = z.object({
    Form_Field_ID: z.string(),
    Form_ID: z.string(),
    FieldType: z.enum(["textInput", "inputNumber", "textarea", "radioBtn", "checkboxList", "select", "datepicker", "percentInput", "naturalNumber"]),
    Name: z.string(),
    Max_Value: z.number(),
    Min_Value: z.number(),
    Default_Value: z.string(),
    Is_Required: z.boolean(),
    OnChange_Info: z.string(),
    Extended_Data: z.string(),
    Regular_Expersion: z.string(),
    Title_Style: z.string(),
    Feild_Style: z.string(),
    Placeholder: z.string().optional(),
    Counting_Position: z.number(),
    FormFieldDetails: z.array(FormFieldDetails).optional()
})

const Forms = z.object({
    Form_ID: z.string().optional(),
    Form_Key: z.string().optional(),
    Title: z.string(),
    Description: z.string().optional(),
    Category_ID: z.string(),
    Form_Type_ID: z.number().optional(),
    Counting_Position: z.number().optional(),
    Mode: z.number().optional(),
    FormFields: z.array(FormFields),
})

const FormSchema = z.object({
    Category_ID: z.string(),
    Category_Key: z.string(),
    Description: z.string(),
    Group_ID: z.string().uuid(),
    Title: z.string(),
    Forms: z.array(Forms).length(1),
}).nullable()

const formMakerApi = {
    Get: {
        url: "/FormMaker/Get",
        type: z.object({
            category_Key: z.string()
        }),
        formData: FormData,
        form: Forms,
        formFieldDetails: FormFieldDetails,
        formFields: FormFields,
        formSchema: z.array(FormSchema),
        response: generalResponseZod.extend({
            data: z.object({
                schema: z.object({
                    jsonVersion: z.number(),
                    json: z.string()
                }),
                form_Data: z.object({
                    schema_is_last: z.boolean(),
                    form_data: z.string(),
                    form_is_expired: z.boolean(),
                    last_modify: z.string()
                })
            })
        })
    },
    Set: {
        url: "/FormMaker/Set",
        type: z.object({
            form_Key: z.string(),
            form_Data: z.any()
        })
    }
}

export {formMakerApi}