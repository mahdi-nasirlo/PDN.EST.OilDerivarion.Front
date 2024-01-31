import { useValidation } from "@/hooks/use-validation";
import basicApi from "../../../../../constance/basic";
import useGetAllRole from "@/hooks/basic/use-get-all-role";
import { useUserUpdateRole } from "@/hooks/basic/use-user-update-role";
import { useGetRoleForUser } from "@/hooks/basic/use-get-role-for-user";
import { useEffect } from "react";
import { z } from "zod";

const useRoleAction = (
  setOpen: (arg: string | undefined) => void,
  open: string | undefined
) => {
  const [form, rules] = useValidation(basicApi.UserUpdateRole.type);

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
    data: z.infer<typeof basicApi.UserUpdateRole.type>
  ) => {
    const res = await updateRole.mutateAsync({
      rolesUid: data.rolesUid,
      userUid: open as string,
    });

    if (res.success) {
      setOpen(undefined);
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
