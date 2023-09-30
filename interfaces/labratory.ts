interface LabratoryGet {
  Name: string | null;
  is_Active: boolean | null;
  fromRecord: number;
  selectRecord: number;
}
interface Labratory {
  name: string | null;
  ranking: number | null;
  stateId: number;
  license_No: string | null;
  license_Expire_Date: string | null;
  tel: string | null;
  fax: string | null;
  address: string | null;
  is_Active: boolean | null;
  Uid: string | null;
}

interface LabCreate {
  address: string,
  fax: string,
  is_Active: true,
  license_Expire_Date: "2023-09-30T12:15:03.950Z",
  license_No: string,
  name: string,
  stateId: 0,
  tel: string
}

interface SaveFormResponsible {
  uid: string | undefined,
  responsibleFirstName: string,
  responsibleLastName: string,
  responsibleNationalCode: string,
  responsibleMobile: string
}

interface SaveFormManager {
  uid: string | undefined,
  managerFirstName: string,
  managerLastName: string,
  managerNationalCode: string,
  managerMobile: string
}