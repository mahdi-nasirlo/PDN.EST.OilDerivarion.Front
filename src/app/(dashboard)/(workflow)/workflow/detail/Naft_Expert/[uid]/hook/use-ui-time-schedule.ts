import useRequestPackageVisitScheduleAdd from "@/hooks/request-package/use-request-package-visit-schedule-add";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";

const useUiTimeSchedule2 = ({ uid }: { uid?: string }) => {
  const addTime = useRequestPackageVisitScheduleAdd();

  const getTime = useRequestPackageVisitScheduleList({
    // taskId: uid as string,
    package_UID: uid,
  });

  const [form] = useForm();

  // useEffect(() => {
  //   form.setFieldsValue(getTime.data);
  // }, [getTime.data]);

  const handleSubmit = async (values: any) => {
    const res = await addTime.mutateAsync({
      visit_Type: 1,
      package_UID: uid,
      ...values,
    });
  };

  return { addTime, getTime, handleSubmit };
};

export default useUiTimeSchedule2;
