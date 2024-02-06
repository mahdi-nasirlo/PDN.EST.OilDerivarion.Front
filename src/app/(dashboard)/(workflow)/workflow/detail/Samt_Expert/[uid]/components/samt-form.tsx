import { Divider, Form, Typography } from "antd";
import React from "react";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";
import useUiTimeSchedule from "../hook/use-ui-time-schedule";

export const SamtForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  const { form, addTime, getTime, handleSubmit } = useUiTimeSchedule({ uid });
  return (
    <>
      <div className="mb-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده صمت
        </Typography>
      </div>
      <Form
        disabled={disable}
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <FormTime disable={disable} />
      </Form>
      <Divider />
    </>
  );
};
