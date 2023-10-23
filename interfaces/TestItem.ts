export type TestItem = {
  Uid?: string;
  Measure_Id: number;
  ReNewabillity: number;
  ReNewabillity_Value: number;
  TestMethod: string;
  Name: string;
  Is_Active: boolean;
  MeasureName: string;
};

export type CreateTestItem = {
  name: string;
  measure_Id: number;
  reNewabillity: number;
  reNewabillity_Value: number;
  testMethod: string;
  is_Active: boolean;
};

export interface TestItemDetail {
  Uid: string | null;
  TestItem_Id: number;
  title: string | null;
  ReferenceCode: string | null;
  is_Active: boolean | null | undefined;
  TestItemName: string | null;
}

export type CreateTestItemDetail = {
  Uid: string | null;
  TestItemUid: string;
  testItem_Id: number;
  title: string | null;
  referenceCode: string | null;
  is_Active: boolean | null;
};
