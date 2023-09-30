interface LaboratoryGet {
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

interface LaboratoryTestItemGet {
  labUid: string | null;
  testItemUid: string | null;
  is_Active: boolean | null;
}
