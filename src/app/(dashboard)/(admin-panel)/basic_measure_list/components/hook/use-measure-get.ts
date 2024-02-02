import useMeasureCreate from "@/hooks/basic/measure/use-measure-create";
import useMeasureGetData from "@/hooks/basic/measure/use-measure-get-data";
import { useMeasureGetPage } from "@/hooks/basic/measure/use-measure-get-page";
import useMeasureUpdate from "@/hooks/basic/measure/use-measure-update";
import { useState } from "react";

const useMeasureGet = () => {
  const [getUid, steGetUid] = useState<string | boolean>();

  const list = useMeasureGetPage();

  const create = useMeasureCreate();

  const get = useMeasureGetData(getUid as string);

  const update = useMeasureUpdate();

  const handleGet = () => {
    steGetUid(getUid as string);
  };

  return {
    update,
    steGetUid,
    getUid,
    handleGet,
    get,
    list,
    create,
    setUid: (uid?: string) => steGetUid(uid),
  };
};
export default useMeasureGet;
