import { useGetUserByNationalCode } from "@/hooks/basic/use-get-user-by-national-code";

const useControlRoleDetermination = () => {
  const users = useGetUserByNationalCode();

  return {
    users,
  };
};

export { useControlRoleDetermination };
