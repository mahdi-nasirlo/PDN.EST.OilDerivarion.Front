import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import useGetAllRole from "@/hooks/basic/role_determination/role/use-get-all-role";

const useControlRoleDetermination = () => {
  const state = useGetAllState();

  const role = useGetAllRole();

  return {
    state,
    role,
  };
};

export { useControlRoleDetermination };
