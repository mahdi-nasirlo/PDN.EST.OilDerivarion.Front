import { useGetUserBySearch } from "@/hooks/basic/use-get-user-by-search";
import useGetAllState from "@/hooks/basic/use-get-all-state";
import useGetAllRole from "@/hooks/basic/use-get-all-role";

const useControlRoleDetermination = () => {
  const users = useGetUserBySearch();

  const state = useGetAllState();

  const role = useGetAllRole();

  return {
    users,
    state,
    role,
  };
};

export { useControlRoleDetermination };
