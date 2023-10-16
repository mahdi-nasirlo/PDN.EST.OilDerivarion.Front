export interface SetBase {
  currentCEOName: string;
  currentCEOLastName: string;
  currentCEONationalCode: number;
  name: number;
  companyOwnershipTypeId: number | string;
}

export interface SetMainMember {
  name: string;
  lastName: string;
  birthDate: string;
  nationalCode: string;
  companyRoleId: string;
  mobileNumber: string;
}

export interface GetPageMainMember {
  key: string | null;
  uid: string | null;
  name: string | null;
  lastName: string | null;
  nationalCode: string | null;
  birthDate: string | null;
  currentMobile: string | null;
  companyRoleName: string | null;
}
