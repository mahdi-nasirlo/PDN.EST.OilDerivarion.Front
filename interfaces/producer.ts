export type GetPage_ExeManager = {
  records: Person[];
  count: number;
};

export type Get_ExeManager = {
  data: Person;
  choices: { label: string; key: string }[];
};

export type Person = {
  row: number;
  name: string;
  nationalCode: string;
  ceoName: string;
  companyOwnershipTypeName: string;
};

export type Employee = {
  companyRoleId: number;
  companyRoleName: string;
  memberName: string;
  memberNationalCode: string;
};

export type Ceo = {
  companyRoleId: number;
  memberNationalCode: string;
  companyRoleName: string;
  memberName: string;
};

export type GetPageProducer = {
  name: string | null;
  companyStatusId: string | number | null;
  fromRecord: number;
  selectRecord: number;
};

export type ProducerRecords = {
  Row?: number | null;
  companyOwnershipTypeName: string | null;
  companyStatusName: string | null;
  name: string | null;
  nationalCode: string | null;
};
