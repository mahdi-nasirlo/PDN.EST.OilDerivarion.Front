export type TestItem = {
  uid?: string;
  name: string;
  isActive: boolean;
  measure_Id: number;
  measureName: string;
  testMethod: string;
  testItem_Details: string | null;
};

export type CreateTestItem = {
  name: string;
  isActive: boolean;
  measure_Id: number;
  testMethod: string;
};

export interface TestItemDetail {
  uid: string | null;
  testItem_Id: number;
  title: string | null;
  referenceCode: string | null;
  isActive: boolean | null | undefined;
  testItemName: string | null;
}

export type CreateTestItemDetail = {
  uid: string | null;
  testItemUid: string;
  testItem_Id: number;
  title: string | null;
  referenceCode: string | null;
  isActive: boolean | null;
};
