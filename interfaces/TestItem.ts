export type TestItem = {
    Uid?: string,
    Measure_Id: number,
    ReNewabillity: number,
    ReNewabillity_Value: number,
    TestMethod: string,
    Name: string,
    Is_Active: boolean,
    MeasureName: string
}

export type CreateTestItem = {
    name: string,
    measure_Id: number,
    reNewabillity: number,
    reNewabillity_Value: number,
    testMethod: string,
    is_Active: boolean
}