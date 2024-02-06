import { Divider, Form, Typography } from "antd";
import React from "react";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";

export const EstForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  return (
    <>
      <div className="mb-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده استاندارد
        </Typography>
      </div>
      <Form disabled={disable} layout="vertical">
        <FormTime disable={disable} />
      </Form>
      <Divider />
    </>
  );
};
