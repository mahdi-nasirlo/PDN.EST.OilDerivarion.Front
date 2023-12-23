export type Product = {
  Id: number;
  uid: string;
  name: string;
  productCategoryName: string;
  productCategory_Id: number;
  isActive: boolean;
  materials:
    | {
        uid: string | null;
        name: string | null;
      }[]
    | null;
  testItems:
    | {
        uid: string | null;
        name: string | null;
      }[]
    | null;
};

export interface ProductGet {
  name: string | null;
  isActive: boolean | null;
  hasDensity: boolean | null;
  densityTypeId: number | null;
  fromRecord: number;
  selectRecord: number;
}

export interface ProductCategoryGet {
  name: string | null;
  isActive: boolean | null;
  productCategoryUid: string | null;
  // productCategoryUid;
  fromRecord: number;
  selectRecord: number;
}

export interface ProductTestItem {
  uid: string;
  isActive: boolean;
  productUid: string;
  testItemUid: string;
  productName: string;
  testItemName: string;
}
