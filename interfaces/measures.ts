export type Measure = {
  Id: number;
  uid?: string;
  name: string;
  isActive: boolean;
  isDeleted: boolean;
};

export type CreateMeasure = {
  name: string;
  IsActive: boolean;
};
export type MeasureGetPage = {
  Name: string | null;
  IsActive: boolean | null;
  fromRecord: number;
  selectRecord: number;
};
