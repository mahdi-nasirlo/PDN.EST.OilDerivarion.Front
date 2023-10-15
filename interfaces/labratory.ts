interface LaboratoryGet {
  Name: string;
  is_Active: boolean | null;
  fromRecord: number;
  selectRecord: number;
}

interface Labratory {
  Name: string | null;
  Ranking: number | null;
  StateId: number;
  License_No: string | null;
  License_Expire_Date: string | null;
  Tel: string | null;
  Fax: string | null;
  Address: string | null;
  Is_Active: boolean | null;
  Uid: string | null;
}

interface LaboratoryTestItemGet {
  labUid: string | null;
  testItemUid: string | null;
  is_Active: boolean | null;
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