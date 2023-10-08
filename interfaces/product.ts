export type Product = {
  Id: number;
  Uid?: string;
  Name: string;
  ProductCategoryName: string;
  ProductCategory_Id: number;
  Is_Active: boolean;
};

export interface ProductGet {
  name: string | null;
  is_Active: boolean | null;
  hasDensity: boolean | null;
  densityLowerLimit: number | null;
  densityUpperLimit: number | null;
  fromRecord: number;
  selectRecord: number;
}

export interface ProductCategoryGet {
  name: string | null;
  is_Active: boolean | null;
  ProductCategoryName: string | null;
  fromRecord: number;
  selectRecord: number;
}
export interface ProductCreate {
  name: "string";
  productCategory_Id: number;
  is_Active: boolean;
}

export interface ProductTestItem {
  Uid: string;
  Is_Active: boolean;
  ProductUid: string;
  TestItemUid: string;
  ProductName: string;
  TestItemName: string;
}
