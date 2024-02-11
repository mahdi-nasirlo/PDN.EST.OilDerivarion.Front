import {useForm} from "antd/lib/form/Form";
import {useRequestPackageReportList} from "@/hooks/request-package/use-request-package-report-list";
import {materialApi} from "../../../../../constance/material";
import {useRequestPackageFinalization} from "@/hooks/request-package/use-request-package-finalization";
import {useState} from "react";

const useUiRequestFinalReview = (package_UID?: string) => {

    const [form] = useForm();

    const reposts = useRequestPackageReportList({
        step_Key: materialApi.GetRegisteredReportsForStepByKey.finalKey,
        package_UID
    });

    const finalRequest = useRequestPackageFinalization();

    const [modalVisibleConfirmation, setModalVisibleConfirmation] =
        useState(false);

    const [modalVisibleFinalSubmit, setModalVisibleFinalSubmit] = useState(false);

    const onFinish = async (values: any) => {

        const res = await finalRequest.mutateAsync({
            uid: package_UID
        });

        if (res.success) {
            setModalVisibleFinalSubmit(true);
        }

    }
    return {
        form,
        reposts,
        finalRequest,
        modalVisibleFinalSubmit,
        setModalVisibleFinalSubmit,
        onFinish,
        modalVisibleConfirmation,
        setModalVisibleConfirmation
    }
};

export default useUiRequestFinalReview;