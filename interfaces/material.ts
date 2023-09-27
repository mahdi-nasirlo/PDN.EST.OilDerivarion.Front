interface Material {
  Uid: string | null | undefined;
  Name: string;
  Is_Active: boolean;
}

interface MaterialGet {
  name: string | null;
  is_Active: boolean | null;
  hasDensity: boolean | null;
  fromRecord: number;
  selectRecord: number;
}
