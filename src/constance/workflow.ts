import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const ChoiceItem = z.object({
  choice_id: z.string(),
  counting_position: z.number(),
  keyword: z.string().nullable(),
  label: z.string(),
  choice_Key: z.string(),
  color: z.string(),
  next_Level_ID: z.string(),
  is_Systemic: z.boolean(),
});

export const workflowApi = {
  choices: ChoiceItem,
  GetAllTask: {
    url: "/WorkFlowRequest/GetAllTask",
    type: z.object({
      stepKey: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        tasks: z.object({
          Title: z.string(),
          Model: z.any(),
          Table: z.object({
            Header: z.array(
              z.object({
                Key: z.string(),
                Value: z.string(),
                Hidden: z.boolean(),
              })
            ),
            Values: z.array(z.any()),
          }),
        }),
        step: z.array(
          z.object({
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
            Creator_id: z.string(),
          })
        ),
      }),
    }),
  },
  GetTask: {
    url: "/WorkFlowRequest/GetTask",
    type: z.object({
      taskId: z.string().uuid(),
      stepKey: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.object({
        choices: z.array(ChoiceItem),
        task: z.object({
          task_id: z.string(),
          System_Opinion_ID: z.number(),
          extended_data: z.string(),
          current_Step_id: z.string(),
          current_Step_Key: z.string(),
          current_Step_Name: z.string(),
          is_Finished: z.boolean(),
          start_Time: z.string(),
          current_Step_Start_Time: z.string(),
          is_Lock: z.boolean(),
          userId: z.number(),
          userDescription: z.string(),
        }),
        listCalendar: z.array(
          z.object({
            solar_fulldate: z.string(),
          })
        ),
      }),
    }),
  },
  SetTask: {
    url: "/WorkFlowRequest/SetTask",
    type: z.object({
      taskId: z.string(),
      choiceKey: z.string().optional(),
      description: z.string().max(500).optional(),
      stepKey: z.string(),
      date: z.string().optional(),
    }),
  },
  GetCartable: {
    url: "/WorkFlowRequest/GetCartable",
    response: generalResponseZod.extend({
      data: z.object({}),
    }),
  },
  GetAllHistory: {
    url: "/WorkFlowRequest/GetAllHistory", 
    type: z.object({
      taskId: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({
        Task_history_id: z.string(),
            Task_id: z.string(),
            Process_ID: z.string(),
            Process_name: z.string(),
            Current_Step_Name: z.string(),
            Step_id: z.number(),
            Step_Name: z.string(),
            Choice_id: z.number(),
            Choice_Key: z.string(),
            Label: z.string(),
            Description_text: z.string().nullable(),
            Role: z.string().nullable(),
            UserId: z.number(),
            UserDescription: z.string(),
            Status: z.number(),
            Creator_id: z.string(),
            Start_Time: z.string(),
            End_Time: z.string()
      })),
    }),
  }
};
