import { Button, Divider, Typography } from "antd";
import React, { useContext } from "react";
import StepContext from "../../stete-manager/step-context";
import { formsUid } from "../../../../../../../Constants/formsUid";
import Resource from "../../../../../../../components/Resource";
import StepContextActivate from '../../../stete-manager/step-context';


export default function Index() {

  const processControllerActivate = useContext(StepContextActivate);
  const processController = useContext(StepContext);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <Typography className='font-bold'>اطلاعات خط تولید (7 از 7)</Typography>
          <Typography className='text-secondary-500'>
            تجهیزات شیرین سازی
          </Typography>
        </div>
      </div >
      <Divider />
      <Resource categoryID={formsUid.desulfation} />
      <Divider />
      <div className="flex gap-3">
        <Button
          className="w-full bg-gray-100"
          size="large"
          type="dashed"
          htmlType="submit"
          onClick={() => processController.dispatch({ type: "PREVIOUS" })}
        >
          مرحله قبلی
        </Button>
        <Button
          className="w-full management-info-form-submit btn-filter"
          size="large"
          type="primary"
          htmlType="submit"
          onClick={() => processControllerActivate.dispatch({ type: "NEXT", stepNumber: 7 })}        >
          مرحله بعد
        </Button>
      </div>
    </>
  );
}
