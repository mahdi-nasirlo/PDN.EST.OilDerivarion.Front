import useBaseInfoGetAllMainMember from "@/hooks/base-info/use-base-info-get-all-main-member";
import useBaseInfoSetMainMember from "@/hooks/base-info/use-base-info-set-main-member";
import useGetCityByState from "@/hooks/base-info/use-city-by-state";
import useSetPersonContact from "@/hooks/base-info/use-set-person-contact";
import useGetAllState from "@/hooks/basic/role_determination/state/use-get-all-state";
import React, { useState } from "react";

const useUiPersonContact = () => {
  const [stateUid, setStateUid] = useState<string>();
  const list = useBaseInfoGetAllMainMember();
  const set = useSetPersonContact();
  const state = useGetAllState();
  const cityByUid = useGetCityByState(stateUid as string);

  return {
    list,
    set,
    state,
    cityByUid,
    setUid: (uid: string) => setStateUid(uid as string),
  };
};

export default useUiPersonContact;
