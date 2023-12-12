interface Material {
  uid: string | null | undefined;
  name: string;
  isActive: boolean;
  measureUid: string | null;
  testItems:
    | {
        uid: string | null;
        name: string | null;
      }[]
    | null;
}

interface MaterialGet {
  name: string | null;
  isActive: boolean | null;
  measureUid: string | null;
  fromRecord: number;
  selectRecord: number;
}

interface MaterialTestItem {
  Uid: string;
  IsActive: boolean;
  MaterialUid: string;
  TestItemUid: string;
  MaterialName: string;
  TestItemName: string;
}
