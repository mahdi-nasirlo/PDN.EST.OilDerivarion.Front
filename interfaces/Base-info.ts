export interface SetBase {
  currentCEOName: string;
  currentCEOLastName: string;
  currentCEONationalCode: number;
  name: number;
  companyOwnershipTypeId: number | string;
}

export interface GerPagePresonLicence {
  uid: string;
  Name: string;
  LicenseTypeId: number;
  Number: string;
  Exporter: string;
  Code: string;
  IssueDate: string;
  ExpirationDate: string;
  IsCurrent: boolean;
  LicenseTypeName: string;
}
export interface CreatePresonLicence {
  name: string;
  licenseTypeId: number;
  number: string;
  exporter: string;
  issueDate: string;
  expirationDate: string;
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

export interface SetProducerLab {
  exportDestinationCountryId: number | null;
  hasWaste: boolean;
  wastePlace: string | null;
  lab_HasAtmosphericDistillation: boolean;
  lab_HasVacuumDistillation: boolean;
  lab_HasPourPoint: boolean;
  lab_HasFlashPoint: boolean;
  lab_HasViscometer: boolean;
  lab_HasMetalCorrosion: boolean;
  lab_HasColorMeter: boolean;
  lab_HasTBN: boolean;
  lab_HasTAN: boolean;
  lab_HasVoltmeter: boolean;
  lab_HasMeasureMocaptan: boolean;
  lab_HasMeasureSulfur: boolean;
  lab_HasDensiometer: boolean;
  lab_HasMeasureColor: boolean;
  lab_HasMeasureMethodGC: boolean;
}
