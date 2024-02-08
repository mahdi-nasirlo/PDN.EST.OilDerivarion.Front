import { useValidation } from "@/hooks/use-validation";
import userRoleStateApi from "../../../../../constance/user-role-state";
import useGetAllRole from "@/hooks/basic/role_determination/role/use-get-all-role";
import { useUserUpdateRole } from "@/hooks/basic/role_determination/role/use-user-update-role";
import { useGetRoleForUser } from "@/hooks/basic/role_determination/role/use-get-role-for-user";
import { useEffect } from "react";
import { z } from "zod";

const useRoleAction = (
  setOpen: (arg: string | undefined) => void,
  open: string | undefined
) => {
  const [form, rules] = useValidation(userRoleStateApi.UserUpdateRole.type);

  const role = useGetAllRole();

  const updateRole = useUserUpdateRole();

  const getRole = useGetRoleForUser(open);

  useEffect(() => {
    console.log(getRole.treeData);
    form.setFieldsValue({
      rolesUid: getRole.treeData,
    });
  }, [getRole.data]);

  const handleSubmit = async (
    data: z.infer<typeof userRoleStateApi.UserUpdateRole.type>
  ) => {
    const res = await updateRole.mutateAsync({
      rolesUid: data.rolesUid,
      userUid: open as string,
    });

    if (res.success) {
      setOpen(undefined);
      form.resetFields();
    }
  };

  return {
    updateRole,
    form,
    rules,
    handleSubmit,
    getRole,
    role,
  };
};

export { useRoleAction };
