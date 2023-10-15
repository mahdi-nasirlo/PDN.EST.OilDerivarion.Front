export type Measure = {
    Id: number,
    Uid?:string 
    Name: string,
    IsActive: boolean,
    IsDeleted:boolean;
  };

  export type CreateMeasure = {
    name:string ,
    isActive: boolean
  };
  export type Measurepage = {
    name:string|null ,
    isActive: boolean|null
  };