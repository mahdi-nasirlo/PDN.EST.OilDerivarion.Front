import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const GetAllMainMemberItem = z.object({
  uid: z.string().uuid(),
  first_Name: z.string(),
  last_Name: z.string(),
  birthDate: z.string(),
  national_Code: z.string(),
  company_Role_Id: z.number(),
  mobile: z.string(),
  is_Management: z.boolean(),
});

const baseInfoApi = {
  GetAllMainMember: {
    url: "/BaseInfo/GetAllMainMember",
    item: GetAllMainMemberItem,
    type: z.object({
      is_Management: z.boolean(),
    }),
    response: generalResponseZod.extend({
      data: z.array(GetAllMainMemberItem),
    }),
  },
  SetMainMember: {
    url: "/BaseInfo/SetMainMember",
    type: z.object({
      first_Name: z.string().max(50),
      last_Name: z.string().max(50),
      birthDate: z.string(),
      national_Code: z.string(),
      company_Role_Id: z.number(),
      mobile: z.string(),
      is_Management: z.boolean(),
    }),
  },
  GetPersonContact: {
    url: "/BaseInfo/GetPersonContact",
    item: GetAllMainMemberItem,
    type: z.object({
      is_Management: z.boolean(),
    }),
    response: generalResponseZod.extend({
      data: z.array(
        z.object({
          factoryStateId: z.string(),
          factoryCityId: z.string(),
          factoryAddressDetail: z.string(),
          factoryPhone: z.string(),
          centralOfficeStateId: z.string().uuid(),
          centralOfficeCityId: z.string().uuid(),
          centralOfficeAddressDetail: z.string(),
          centralOfficePhone: z.string(),
        })
      ),
    }),
  },
  SetPersonContact: {
    url: "/BaseInfo/SetPersonContact",
    type: z.object({
      factoryStateId: z.string(),
      factoryCityId: z.string(),
      factoryAddressDetail: z.string().max(50),
      factoryPhone: z.string(),
      centralOfficeStateId: z.string().uuid(),
      centralOfficeCityId: z.string().uuid(),
      centralOfficeAddressDetail: z.string().max(50),
      centralOfficePhone: z.string(),
    }),
  },
  GetCityByState: {
    url: "/Basic/GetCityByState",
    item: GetAllMainMemberItem,
    type: z.object({
      name: z.string().max(50).optional(),
      isActive: z.boolean().optional(),
      stateUid: z.string().uuid(),
    }),
    response: generalResponseZod.extend({
      data: z.array(z.object({})),
    }),
  },
};

export default baseInfoApi;
