import {useGetUserBySearch} from "@/hooks/basic/use-get-user-by-search";
import useGetAllState from "@/hooks/basic/use-get-all-state";

const useControlRoleDetermination = () => {

  const users = useGetUserBySearch();
  const state = useGetAllState()

  return {
    users,
    state
  };
};

export { useControlRoleDetermination };
