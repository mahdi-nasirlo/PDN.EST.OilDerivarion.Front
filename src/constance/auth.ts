import {generalResponseZod} from "@/types/api-response";
import {z} from "zod";
import {errorMessage} from "./error-message";

const ssoApi = {
  access_token_Key: "access_token",
  test: {
    type: z.object({
      factoryCityId: z.string({
        required_error: errorMessage.required_choice,
      }),
      factoryStateId: z.string({
        required_error: errorMessage.required_choice,
      }),
      licenseValidityDatePersin: z.string({
        required_error: errorMessage.required,
      }),
      businessNumber: z
        .string({
          required_error: errorMessage.required,
        })
        .regex(/^\d*$/, { message: errorMessage.number_invalid })
        .length(12, { message: "لطفا 12 رقم وارد کنید" }),
      licenseTypeId: z.string({
        required_error: errorMessage.required_choice,
      }),
      licenseNumber: z
        .string({
          required_error: errorMessage.required,
        })
        .regex(/^\d*$/, { message: errorMessage.number_invalid })
        .length(12, { message: "لطفا 12 رقم وارد کنید" }),
    }),
  },
  getAllUserAccess: {
    url: "/Sso/GetAllUserPage",
    response: generalResponseZod.extend({
      data: z
        .array(
          z.object({
            nameFa: z.string(),
            url: z.string(),
          })
        )
        .or(z.null()),
    }),
  },
  getUserInfo: {
    url: "/Sso/GetUserInfo",
    response: generalResponseZod.extend({
      data: z.object({
        lastName: z.string(),
        firstName: z.string(),
        userLevelId: z.number().optional(),
        userLevelName: z.string().optional(),
      }),
    }),
  },
  logout: {
    url: "/Sso/CheckToken",
    response: generalResponseZod.extend({
      data: z
        .object({
          clientId: z.string(),
          redirectUri: z.string(),
          ssoUrl: z.string(),
        })
        .optional(),
    }),
  },
  checkToken: {
    url: "/Sso/CheckToken",
    response: generalResponseZod.extend({
      data: z
        .object({
          clientId: z.string(),
          redirectUri: z.string(),
          ssoUrl: z.string(),
        })
        .optional(),
    }),
  },
  getToken: {
    url: "/Sso/GetToken",
    response: generalResponseZod.extend({
      data: z.object({
        access_token: z.string().min(10, "توکن اجباری می باشد."),
        token_type: z.string(),
      }),
    }),
    type: z.object({
      code: z.string(),
    }),
  },
  getSession: {
    type: z.object(
        {
          access_token: z.string(),
          user: z.object({
            name: z.string(),
            email: z.string()
          }),
          expires: z.string()
        }
    )
  }
};

export { ssoApi };
