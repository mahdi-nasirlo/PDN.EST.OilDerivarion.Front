import useAddRequest from "@/hooks/license/use-add-request";
import useDelRequest from "@/hooks/license/use-del-request";
import useGetAvailbleTypes from "@/hooks/license/use-get-availble-types";
import useGetProducerInfo from "@/hooks/license/use-get-producer-info";
import useGetRequestList from "@/hooks/license/use-get-request-list";
import { useState } from "react";

const useProducerInfo = () => {
  const [delUid, setDelUid] = useState<string | boolean>();

  const producerInfo = useGetProducerInfo();
  const license = useGetAvailbleTypes();
  const addLicense = useAddRequest();
  const list = useGetRequestList();
  const del = useDelRequest(delUid as string);

  const handleDelete = async () => {
    const res = await del.mutateAsync({ uid: delUid as string });

    if (res.success) setDelUid(undefined);
  };

  return {
    producerInfo,
    setDelUid,
    delUid,
    license,
    addLicense,
    list,
    del,
    handleDelete,
  };
};

export default useProducerInfo;
