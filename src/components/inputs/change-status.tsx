"use client";

import React, { useState } from "react";
import { Spin, Switch } from "antd";
import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../../lib/server/mutationFetcher";

interface PropsType {
  IsActive: boolean | undefined;
  uid: string | undefined | null;
  url: string;
}

const ChangeStatus = (props: PropsType) => {
  const { trigger, isMutating } = useSWRMutation(
    props.url ? props.url : "",
    mutationFetcher
  );

  const [value, setValue] = useState(props.IsActive);

  const handleChange = async (e: boolean) => {
    setValue(e);

    const res = await trigger({
      uid: props.uid,
      IsActive: e,
    });

    if (!res) {
      setValue(!e);
    }
  };

  return (
    <div className="flex justify-center">
      {isMutating ? (
        <Spin spinning={true} />
      ) : (
        <Switch checked={value} onChange={handleChange} />
      )}
    </div>
  );
};

export default ChangeStatus;
