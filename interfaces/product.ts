export type Product = {
  Id: number;
  Uid?: string;
  Name: string;
  ProductCategoryName: string;
  ProductCategory_Id: number;
  IsActive: boolean;
};

export interface ProductGet {
  name: string | null;
  IsActive: boolean | null;
  densityTypeId: number | null;
  fromRecord: number;
  selectRecord: number;
}

export interface ProductCategoryGet {
  Name: string | null;
  IsActive: boolean | null;
  ProductCategoryName: string | null;
  // productCategoryUid;
  fromRecord: number;
  selectRecord: number;
}
export interface ProductCreate {
  name: "string";
  productCategory_Id: number;
  IsActive: boolean;
}

export interface ProductTestItem {
  Uid: string;
  IsActive: boolean;
  ProductUid: string;
  TestItemUid: string;
  ProductName: string;
  TestItemName: string;
}
