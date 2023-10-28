interface Material {
  Uid: string | null | undefined;
  Name: string;
  IsActive: boolean;
  MeasureUid: string | null;
}

interface MaterialGet {
  Name: string | null;
  IsActive: boolean | null;
  MeasureUid: string | null;
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
