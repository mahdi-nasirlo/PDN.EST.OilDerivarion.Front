interface LaboratoryGet {
  Name: string | null;
  IsActive: boolean | null;
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
  IsActive: boolean | undefined;
  Uid: string | null;
}

interface LaboratoryTestItemGet {
  labUid: string | null;
  testItemUid: string | null;
  IsActive: boolean | null;
}

interface LabCreate {
  address: string;
  fax: string;
  IsActive: true;
  license_Expire_Date: string;
  license_No: string;
  name: string;
  stateId: number;
  tel: string;
}

interface SaveFormResponsible {
  uid: string | undefined;
  responsibleFirstName: string;
  responsibleLastName: string;
  responsibleNationalCode: string;
  responsibleMobile: string;
}

interface SaveFormManager {
  uid: string | undefined;
  managerFirstName: string;
  managerLastName: string;
  managerNationalCode: string;
  managerMobile: string;
}
