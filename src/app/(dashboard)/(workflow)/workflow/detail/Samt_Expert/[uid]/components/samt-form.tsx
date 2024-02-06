import { Divider, Form, Typography } from "antd";
import React, { useEffect } from "react";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";
import useUiTimeSchedule from "../hook/use-ui-time-schedule";
import { RequestPackageApi } from "constance/request-package";
import { useValidation } from "@/hooks/use-validation";

export const SamtForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  const { addTime, getTime, handleSubmit } = useUiTimeSchedule({ uid });
  const [form, ruls] = useValidation(RequestPackageApi.VisitScheduleList.item);
  useEffect(() => {
    if (getTime?.data) {
      form.setFieldsValue(getTime?.data[0]);
    }
    console.log(getTime?.data);
  }, [getTime.data]);
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
