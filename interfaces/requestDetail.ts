export interface RequestDetail {
    Id: number,
    Uid: string,
    RequestMasterId: number,
    ProductOrMaterialId: number,
    IsProduct: boolean,
    UniqueCode: null | string,
    MaterialSupplyMethodId: number,
    CreateDate: string,
    MaterialTotalConsumption: string,
    MaterialUnitConsumption: string,
    MaterialUsagePercentage: number,
    MaterialInternalSupplyPercentage: number,
    MaterialForeignSupplyPercentage: number,
    MaterialImportDeclarationNumber: string,
    MaterialSupplyName: string,
    MaterialSupplyPersonTypeId: number,
    MaterialSupplyNationalCode: string,
    MaterialSupplyIranCode: string,
    MaterialSupplyAddress: string,
    ProductOrMaterialName: string,
    ProductDensityTypeId: null | number,
    StepNumber: number
}

export interface selectableProduct{
    uid:string
    densityType:boolean
}