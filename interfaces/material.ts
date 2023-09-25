interface Material {
    Uid: string | null | undefined,
    Name: string,
    Is_Active: boolean,
}

interface MaterialGet {
    name: string | null,
    is_Active: boolean,
    fromRecord: number,
    selectRecord: number,
}