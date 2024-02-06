import { Divider, Typography } from "antd";
import React from "react";
import { RequestPackageApi } from "../../../../../../../../constance/request-package";
import { Form } from "antd/lib";
import { FormTime } from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";
import useUiTimeSchedule from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/hook/use-ui-time-schedule";

const apiData = RequestPackageApi.VisitScheduleAdd;
export const NaftForm = ({
  disable,
  uid,
}: {
  disable: boolean;
  uid?: string;
}) => {
  return (
    <>
      <div className="my-5">
        <Typography className="text-right text-[16px] font-bold text-orange-300">
          نماینده نفت
        </Typography>
      </div>
      <Form disabled={disable} layout="vertical">
        <FormTime disable={disable} />
      </Form>
      <Divider />
    </>
  );
};
