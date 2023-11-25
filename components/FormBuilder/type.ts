import {z} from "zod";

export const FormSchemaFormFieldDetailsStructure = z.array(z.object({
    Form_Filed_Detail_ID: z.string(),
    Form_Field_ID: z.string(),
    Value: z.string(),
    Text: z.string()
})).optional()

export const FormSchemaFormFieldsStructure = z.array(
    z.object({
        Form_Field_ID: z.string(),
        Form_ID: z.string(),
        FieldType: z.string(),
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
        Counting_Position: z.number(),
        FormFieldDetails: FormSchemaFormFieldDetailsStructure
    })
).optional()

export const FormSchemaFormsStructure = z.array(
    z.object({
        Form_ID: z.string().optional(),
        Form_Key: z.string().optional(),
        Title: z.string(),
        Category_ID: z.string(),
        Form_Type_ID: z.number().optional(),
        Counting_Position: z.number().optional(),
        Mode: z.number().optional(),
        FormFields: FormSchemaFormFieldsStructure
    })
)

export const FormSchemaStructure = z.array(
    z.object({
        Title: z.string(),
        Group_ID: z.string(),
        Category_ID: z.string(),
        Category_Key: z.string(),
        Description: z.string(),
        Forms: FormSchemaFormsStructure
    })
)
