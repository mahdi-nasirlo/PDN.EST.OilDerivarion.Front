export interface SetBase {
  currentCEOName: string;
  currentCEOLastName: string;
  currentCEONationalCode: number;
  name: number;
  companyOwnershipTypeId: number | string;
}

export interface GerPagePresonLicence {
  Uid: string,
        Name: string,
        LicenseTypeId: number,
        Number: string,
        Exporter: string,
        Code: string,
        IssueDate: string
        ExpirationDate: string
        IsCurrent: boolean
        LicenseTypeName: string
}
export interface CreatePresonLicence {
  name: string,
  licenseTypeId: number,
  number: string,
  exporter: string,
  issueDate: string
  expirationDate: string
}

export interface SetMainMember {
  name: string;
  lastName: string;
  birthDate: string;
  nationalCode: string;
  companyRoleId: string;
  currentMobile: string;
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

export interface SetEmployeeMember {
  name: string | null;
  lastName: string | null;
  birthDate: string | null;
  nationalCode: string | null;
  currentMobile: string | null;
}

export interface GetPageEmployee {
  uid: string | null;
  name: string | null;
  lastName: string | null;
  nationalCode: string | null;
  birthDate: string | null;
  currentMobile: string | null;
  companyRoleName: string | null;
}
