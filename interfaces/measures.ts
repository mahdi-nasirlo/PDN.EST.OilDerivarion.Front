export type Measure = {
  Id: number;
  Uid?: string;
  Name: string;
  IsActive: boolean;
  IsDeleted: boolean;
};

export type CreateMeasure = {
  name: string;
  isActive: boolean;
};
export type MeasureGetPage = {
  Name: string | null;
  IsActive: boolean | null;
  fromRecord: number;
  selectRecord: number;
};
