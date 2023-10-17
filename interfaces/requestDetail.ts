export interface RequestDetail {
    Id: number,
    Uid: string,
    RequestMasterId: number,
    requestMasterUid: string,
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

export interface Product {
    Id: number,
    Uid: string,
    RequestMasterId: number,
    ProductOrMaterialId: number,
    IsProduct: boolean,
    UniqueCode: string | number,
    MaterialSupplyMethodId: number | null,
    CreateDate: string,
    MaterialTotalConsumption: string | null,
    MaterialUnitConsumption: string | null,
    MaterialUsagePercentage: string | null,
    MaterialInternalSupplyPercentage: string | null,
    MaterialForeignSupplyPercentage: string | null,
    MaterialImportDeclarationNumber: string | null,
    MaterialSupplyName: string | null,
    MaterialSupplyPersonTypeId: string | null,
    MaterialSupplyNationalCode: string | null,
    MaterialSupplyIranCode: string | null,
    MaterialSupplyAddress: string | null,
    ProductOrMaterialName: string,
    ProductDensityTypeId: number,
    StepNumber: number
}

export interface Get_ExeManager {
    choices: Choice[],
    requestMaster: RequestMaster
}

export interface RequestMaster {
    id: number,
    uid: string,
    processDescription: string,
    fileName: string | null,
    isReqDetailCompleted: boolean,
    ownerId: number
}

export interface Choice {
    choice_Key: string,
    choice_id: string,
    counting_position: number,
    keyword: string,
    label: string,
}

export interface selectableProduct {
    uid: string
    densityType: boolean
}