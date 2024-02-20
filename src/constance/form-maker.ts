import {z} from "zod";
import {generalResponseZod} from "@/types/api-response";

const FormData = z.any();

const FormFieldDetails = z.object({
  Form_Filed_Detail_ID: z.string(),
  Form_Field_ID: z.string(),
  Value: z.string(),
  Text: z.string(),
});

const FormFields = z.object({
  Form_Field_ID: z.string(),
  Form_ID: z.string(),
  FieldType: z.enum([
    "textInput",
    "inputNumber",
    "textarea",
    "radioBtn",
    "checkboxList",
    "select",
    "datepicker",
    "percentInput",
    "naturalNumber",
    "TemperatureInput",
  ]),
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
  FormFieldDetails: z.array(FormFieldDetails).optional(),
});

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
});

const FormSchema = z
  .object({
    Category_ID: z.string(),
    Category_Key: z.string(),
    Description: z.string(),
    Group_ID: z.string().uuid(),
    Title: z.string(),
    Forms: z.array(Forms).length(1),
  })
  .nullable();

const ProducerFormsGetDocHistoryItem = z.object({
  UID: z.string(),
  last_modify_fa: z.string(),
  last_modify: z.string(),
  is_draft: z.string(),
  form_is_expired: z.string(),
});

const formMakerApi = {
  Get: {
    url: "/FormMaker/Get",
    type: z.object({
      category_Key: z.string(),
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
          json: z.string(),
        }),
        form_Data: z.object({
          schema_is_last: z.boolean(),
          form_data: z.string(),
          form_is_expired: z.boolean(),
          last_modify: z.string(),
        }),
      }),
    }),
  },
  Set: {
    url: "/FormMaker/Set",
    type: z.object({
      form_Key: z.string(),
      form_Data: z.any(),
    }),
  },
  ProducerFormsGetDocHistory: {
    url: "/FormMaker/ProducerFormsGetDocHistory",
    type: z.object({
      form_Key: z.string(),
    }),
    item: ProducerFormsGetDocHistoryItem,
    response: generalResponseZod.extend({
      data: z.object({
        form_Data: z.array(ProducerFormsGetDocHistoryItem),
      }),
    }),
  },
  ProducerFormsGetDocSchemaByUid: {
    url: "/FormMaker/ProducerFormsGetDocSchemaByUID",
    type: z.object({
      form_Key: z.string(),
      form_UID: z.string().optional().nullable(),
      taskId: z.string().nullable(),
    }),
    response: generalResponseZod.extend({
      data: z
        .array(
          z.object({
            form_data: z.string(),
            Schema_Data: z.string(),
          })
        )
        .min(1),
    }),
    type1Res: z.object({
      Title: z.string().nullable(),
      Table: z.object({
        Header: z.array(z.object({
          Key: z.string(),
          Value: z.string(),
          Hidden: z.boolean()
        })).nullable(),
        Values: z.record(z.string(), z.string().or(z.number())).nullable()
      }).nullable(),
      Model: z.array(z.object({
        Key: z.string(),
        Value: z.string().or(z.number()),
        Hidden: z.boolean()
      })).nullable(),
      ListTable: z.array(z.object({
        Title: z.string().optional(),
        Header: z.array(z.object({
          Key: z.string(),
          Value: z.string(),
          Hidden: z.boolean()
        })).or(z.undefined()).nullable(),
        Values: z.array(z.any())
      }).nullable()).optional()
    })
  },
  GetDoc2: {
    url: "/FormMaker/GetDoc2",
    type: z.object({
      form_Key: z.string(),
      uid: z.string(),
      package_Uid: z.string(),
      isLastStep: z.string().optional()
    }),
    response: generalResponseZod.extend({
      data: z.object({
        header: z.array(z.object({
          key: z.string(),
          value: z.string(),
          hidden: z.boolean().nullable()
        })),
        values: z.array(z.any())
      })
    })
  }
};

export { formMakerApi };
