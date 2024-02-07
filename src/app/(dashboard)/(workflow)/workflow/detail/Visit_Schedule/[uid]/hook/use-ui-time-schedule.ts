import useRequestPackageVisitScheduleAdd from "@/hooks/request-package/use-request-package-visit-schedule-add";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";

const useUiTimeSchedule2 = ({ uid }: { uid?: string }) => {

  const addTime = useRequestPackageVisitScheduleAdd();

  const getTime = useRequestPackageVisitScheduleList({
    package_UID: uid,
  });


  const handleSubmitNaft = async (values: any) => {
    const res = await addTime.mutateAsync({
      visit_Type: 1,
      package_UID: uid,
      ...values,
    });
  };
  const handleSubmitSamt = async (values: any) => {
    const res = await addTime.mutateAsync({
      visit_Type: 2,
      package_UID: uid,
      ...values,
    });
  };
  const handleSubmitEst = async (values: any) => {
    const res = await addTime.mutateAsync({
      visit_Type: 3,
      package_UID: uid,
      ...values,
    });
  };

  return {
    addTime,
    getTime,
    handleSubmitNaft,
    handleSubmitEst,
    handleSubmitSamt,
  };
};

export default useUiTimeSchedule2;
