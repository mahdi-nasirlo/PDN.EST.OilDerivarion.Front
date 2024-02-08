import { useValidation } from "@/hooks/use-validation";
import userRoleStateApi from "../../../../../constance/user-role-state";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import { useUserUpdateState } from "@/hooks/basic/role_determination/state/use-user-update-state";
import { z } from "zod";
import { useGetStateForUser } from "@/hooks/basic/role_determination/state/use-get-state-for-user";
import { useEffect } from "react";

const useStateAction = (
  setOpen: (arg: string | undefined) => void,
  open: string | undefined
) => {
  const [form, rules] = useValidation(userRoleStateApi.UserUpdateState.type);

  const state = useGetAllState();

  const updateState = useUserUpdateState();

  const getState = useGetStateForUser(open);

  useEffect(() => {
    console.log(getState.treeData);
    form.setFieldsValue({
      sates_Uid: getState.treeData,
    });
  }, [getState.data]);

  const handleSubmit = async (
    data: z.infer<typeof userRoleStateApi.UserUpdateState.type>
  ) => {
    const res = await updateState.mutateAsync({
      sates_Uid: data.sates_Uid,
      user_Uid: open as string,
    });

    if (res.success) {
      setOpen(undefined);
      form.resetFields();
    }
  };

  return {
    updateState,
    form,
    rules,
    handleSubmit,
    getState,
    state,
  };
};

export { useStateAction };
