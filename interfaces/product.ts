export type Product = {
    Id: number;
    Uid?: string;
    Name: string;
    ProductCategoryName: string;
    ProductCategory_Id: number;
    Is_Active: boolean;
};

export interface ProductGet {
    name: string | null,
    is_Active: boolean,
    fromRecord: number,
    selectRecord: number,
}

export interface ProductCreate {
    name: "string",
    productCategory_Id: number,
    is_Active: boolean
}