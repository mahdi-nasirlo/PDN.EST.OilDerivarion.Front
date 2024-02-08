import useRequestPackageLabVisitOpinionAdd from "@/hooks/request-package/use-request-pakage-lab-visit-opinion-add";
import useRequestPackageLabVisitOpinionList from "@/hooks/request-package/use-request-pakage-lab-visit-opinion-list";

const useUiLabVisitResult = ({ uid }: { uid?: string }) => {
  const addTime = useRequestPackageLabVisitOpinionAdd();

  const getTime = useRequestPackageLabVisitOpinionList({
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

export default useUiLabVisitResult;
