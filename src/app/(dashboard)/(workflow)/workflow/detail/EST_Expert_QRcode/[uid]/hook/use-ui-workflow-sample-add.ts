import useBoxList from "@/hooks/request-package/use-box-list";

const useUiWorkflowSampleAdd = ({package_UID}: { package_UID: string }) => {

    const boxList = useBoxList({package_UID})


    return {boxList}
};

export default useUiWorkflowSampleAdd;