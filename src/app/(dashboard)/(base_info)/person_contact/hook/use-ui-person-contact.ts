import useBaseInfoGetAllMainMember from "@/hooks/base-info/use-base-info-get-all-main-member";
import useBaseInfoSetMainMember from "@/hooks/base-info/use-base-info-set-main-member";
import React from "react";

const useUiPersonContact = () => {
  const list = useBaseInfoGetAllMainMember();
  const create = useBaseInfoSetMainMember();

  return { list, create };
};

export default useUiPersonContact;
