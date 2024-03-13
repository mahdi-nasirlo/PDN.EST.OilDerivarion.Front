import useAddRequest from "@/hooks/license/use-add-request";
import useDelRequest from "@/hooks/license/use-del-request";
import useGetAvailbleTypes from "@/hooks/license/use-get-availble-types";
import useGetProducerInfo from "@/hooks/license/use-get-producer-info";
import useGetRequestListForCurrentUser from "@/hooks/license/use-get-request-list-for-current-user";
import { FormInstance } from "antd";
import { useState } from "react";

const useProducerInfo = (form?: FormInstance) => {
  const [delUid, setDelUid] = useState<string | boolean>();

  const producerInfo = useGetProducerInfo();
  const license = useGetAvailbleTypes();
  const addLicense = useAddRequest();
  const list = useGetRequestListForCurrentUser();
  const del = useDelRequest(delUid as string);

  const handleDelete = async () => {
    const res = await del.mutateAsync({ uid: delUid as string });

    if (res.success) setDelUid(undefined);
  };

  const addLicenseHandle = async (data: any) => {
    const res = await addLicense.mutateAsync(data);

    if (res.success) {
      form?.setFieldValue("Long", undefined);
      form?.setFieldValue("Lat", undefined);
      form?.setFieldValue("state_Uid", undefined);
      form?.setFieldValue("license_Expire_Date_Fa", undefined);
      form?.setFieldValue("license_Number", undefined);
      form?.setFieldValue("license_Type_ID", undefined);
      form?.setFieldValue("company__Business_ID", undefined);
      form?.setFieldValue("company__National_ID", undefined);
    }
  };

  return {
    producerInfo,
    setDelUid,
    delUid,
    license,
    addLicense,
    addLicenseHandle,
    list,
    del,
    handleDelete,
  };
};

export default useProducerInfo;
