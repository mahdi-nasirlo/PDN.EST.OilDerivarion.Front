import useRequestPackageVisitScheduleAdd from "@/hooks/request-package/use-request-package-visit-schedule-add";
import {useForm} from "antd/lib/form/Form";
import useRequestPackageVisitScheduleList from "@/hooks/request-package/use-request-package-visit-schedule-list";

const useUiTimeSchedule = ({uid}: { uid?: string }) => {

    const addTime = useRequestPackageVisitScheduleAdd()

    const getTime = useRequestPackageVisitScheduleList({taskId: uid as string, package_UID: uid})

    const [form] = useForm()

    const handleSubmit = async (values: any) => {

        const res = await addTime.mutateAsync({
            visit_Type: 1,
            package_UID: uid,
            ...values
        })

    }

    return {addTime, getTime, form, handleSubmit}
};

export default useUiTimeSchedule;