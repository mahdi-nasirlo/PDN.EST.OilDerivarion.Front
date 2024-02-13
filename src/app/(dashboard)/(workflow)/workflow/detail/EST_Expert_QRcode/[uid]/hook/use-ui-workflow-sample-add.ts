import useBoxList from "@/hooks/request-package/use-box-list";
import useBoxSampleDelete from "@/hooks/request-package/use-box-sample-delete";

const useUiWorkflowSampleAdd = ({ package_UID }: { package_UID: string }) => {
  const boxList = useBoxList({ package_UID });

  const deleteSample = useBoxSampleDelete();

  return { boxList, deleteSample };
};

export default useUiWorkflowSampleAdd;
