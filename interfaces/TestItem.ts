export type TestItem = {
  uid?: string;
  name: string;
  isActive: boolean;
  measure_Id: number;
  measureName: string;
  testMethod: string;
  testItem_Details:
    | {
        uid: string | null;
        title: string | null;
      }[]
    | null;
};

export type CreateTestItem = {
  name: string;
  isActive: boolean;
  measure_Id: number;
  testMethod: string;
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
