export type Category =
    {
        Id: number,
        Uid?: string,
        SmallCode: string | null,
        Name: string,
        HasDensity: boolean,
        DensityUpperLimit: number,
        DensityLowerLimit: number,
        Is_Active: boolean,
        DensityTypeId: number,
        TestMethodId: number,
        IsDeleted: boolean
    }