interface Material {
    Uid: string | null | undefined,
    Name: string,
    Is_Active: boolean,
}

interface MaterialGet {
    name: string | null,
    is_Active: boolean | null,
    fromRecord: number,
    selectRecord: number,
}

interface MaterialTestItem {
    "Uid": string,
    "Is_Active": boolean,
    "MaterialUid": string,
    "TestItemUid": string,
    "MaterialName": string,
    "TestItemName": string
}