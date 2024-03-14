import { z } from "zod";
import { generalResponseZod } from "@/types/api-response";

const messageApi = {
  UnreadMessagesCount: {
    url: "/Messaeg/UnreadMessagesCount",
    type: z.object({
      userName: z.string(),
    }),
    response: generalResponseZod.extend({
      data: z.number(),
    }),
  },

  GetMessageList: {
    url: "/Messaeg/GetMessageList",
    type: z.object({
      userName: z.string(),
      direction: z.boolean(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          UId: z.string(),
          Body: z.string(), // به جای Body ،Title یا Subject اضافه شود
          Is_Read: z.boolean(),
          //   Write_Date: z.string(), اضافه شود
        })
      ),
    }),
  },

  GetUserMessage: {
    url: "/Messaeg/GetUserMessage",
    type: z.object({
      uid: z.string().uuid(),
      userName: z.string(),
      direction: z.boolean(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          Id: z.number(),
          UId: z.string(),
          Receiver: z.number(),
          Sender: z.number(),
          Subject: z.string(),
          Body: z.string(),
          Is_Star: z.boolean(),
          Write_Date: z.string(),
          Read_Date: z.string(),
          Is_Read: z.boolean(),
          Delete_Date: z.string(),
          Is_Delete: z.boolean(),
          Message_Type: z.number(),
        })
      ),
    }),
  },
};

export { messageApi };
