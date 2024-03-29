import { useAddReportToStep } from "@/hooks/basic/step_report/use-add-report-to-step";
import useGetStep from "@/hooks/basic/step_report/use-get-step";
import { useDeleteReportToStep } from "@/hooks/basic/step_report/use-delete-report-to-step";
import { useGetAvailableReportsForStep } from "@/hooks/basic/step_report/use-get-available-reports-for-step";
import { useGetRegisteredReportsForStep } from "@/hooks/basic/step_report/use-get-registered-reports-for-step";
import { useState } from "react";

const useControlTransfer = () => {
  const [stepUid, setStepUid] = useState<string>();

  const steps = useGetStep();

  const availableReport = useGetAvailableReportsForStep(stepUid);

  const registeredReport = useGetRegisteredReportsForStep(stepUid);

  const addReport = useAddReportToStep(stepUid as string);

  const deleteReport = useDeleteReportToStep(stepUid as string);

  const handleOnChange = async (
    nextTargetKeys: string[],
    direction: "right" | "left",
    movedKeys: string[]
  ) => {
    if (direction == "right") await addReport.handleMutate(nextTargetKeys);
    else await deleteReport.handleMutate(movedKeys);
  };

  return {
    dataSource: (registeredReport.transferDataSource || []).concat(
      availableReport.transferDataSource || []
    ),
    steps,
    availableReport,
    registeredReport: registeredReport,
    addReport,
    deleteReport,
    setStep: (uid: string) => setStepUid(uid),
    handleOnChange,
  };
};

export { useControlTransfer };
