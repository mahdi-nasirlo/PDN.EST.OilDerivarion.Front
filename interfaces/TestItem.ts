export type TestItem = {
  Uid?: string;
  Measure_Id: number;
  ReNewabillity: number;
  ReNewabillity_Value: number;
  TestMethod: string;
  Name: string;
  IsActive: boolean;
  MeasureName: string;
};

export type CreateTestItem = {
  name: string;
  measure_Id: number;
  reNewabillity: number;
  reNewabillity_Value: number;
  testMethod: string;
  IsActive: boolean;
};

export interface TestItemDetail {
  Uid: string | null;
  TestItem_Id: number;
  title: string | null;
  ReferenceCode: string | null;
  IsActive: boolean | null | undefined;
  TestItemName: string | null;
}

export type CreateTestItemDetail = {
  Uid: string | null;
  TestItemUid: string;
  testItem_Id: number;
  title: string | null;
  referenceCode: string | null;
  IsActive: boolean | null;
};
