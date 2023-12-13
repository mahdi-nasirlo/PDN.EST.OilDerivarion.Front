interface LaboratoryGet {
  name: string | null;
  isActive: boolean | null;
  fromRecord: number;
  selectRecord: number;
}

interface Laboratory {
  uid: string | null;
  name: string | null;
  isActive: boolean | undefined;
  ranking: number | null;
  stateId: number;
  license_No: string | null;
  license_Expire_Date: string | null;
  tel: string | null;
  fax: string | null;
  address: string | null;
  testItems:
    | {
        uid: string | null;
        name: string | null;
      }[]
    | null;
}

interface LaboratoryTestItemGet {
  labUid: string | null;
  testItemUid: string | null;
  isActive: boolean | null;
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
