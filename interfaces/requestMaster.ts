export type StateOrgManager = {
    task_id: string;
    extended_data: string | null;
    userDescription: string;
};


export type RequestMaster = {
    Uid: string,
    SampleTypeName: string,
    BarcodeUsePlaceTypeName: string,
    ContainerTypeName: string,
    GpsDeviceCode: string

}