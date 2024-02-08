import useRequestPackageVisitScheduleAdd from "@/hooks/request-package/use-request-package-visit-schedule-add";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";
import useRequestPackageVisitOpinionAdd from "@/hooks/request-package/use-request-pakage-visit-opinion-add";
import useRequestPackageVisitOpinionList from "@/hooks/request-package/use-request-pakage-visit-opinion-list";

const useUiVisitResult = ({ uid }: { uid?: string }) => {
  const addTime = useRequestPackageVisitOpinionAdd();

  const getTime = useRequestPackageVisitOpinionList({
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
    console.log(values);
  };

  return {
    addTime,
    getTime,
    handleSubmitNaft,
    handleSubmitEst,
    handleSubmitSamt,
  };
};

export default useUiVisitResult;
