import { useAddReportToStep } from "@/hooks/basic/use-add-report-to-step";
import useGetStep from "@/hooks/basic/use-basic";
import { useDeleteReportToStep } from "@/hooks/basic/use-delete-report-to-step";
import { useGetAvailableReportsForStep } from "@/hooks/basic/use-get-available-reports-for-step";
import { useGetRegisteredReportsForStep } from "@/hooks/basic/use-get-registered-reports-for-step";
import { useEffect, useState } from "react";

const useControlTransfer = () => {

    const [stepUid, setStepUid] = useState<string>()

    const steps = useGetStep();

    const availableReport = useGetAvailableReportsForStep(stepUid)

    const registerdReport = useGetRegisteredReportsForStep(stepUid)

    const addReport = useAddReportToStep(stepUid as string)

    const deleteReport = useDeleteReportToStep(stepUid as string)

    const handleOnChange = (nextTargetKeys: string[], direction: "right" | "left") => {
        if (direction == 'right') addReport.handleMutate(nextTargetKeys)
        else deleteReport.handleMutate(nextTargetKeys)
    }

    return {
        dataSource: registerdReport.transferDataSource?.concat(
            availableReport.transferDataSource
        ),
        steps,
        availableReport,
        registerdReport,
        addReport,
        deleteReport,
        setStep: (uid: string) => setStepUid(uid),
        handleOnChange
    }
}

export {useControlTransfer}