import useGetAllState from "@/hooks/basic/use-get-all-state";
import useGetAllRole from "@/hooks/basic/use-get-all-role";

const useControlRoleDetermination = () => {
  const state = useGetAllState();

  const role = useGetAllRole();

  return {
    state,
    role,
  };
};

export { useControlRoleDetermination };
