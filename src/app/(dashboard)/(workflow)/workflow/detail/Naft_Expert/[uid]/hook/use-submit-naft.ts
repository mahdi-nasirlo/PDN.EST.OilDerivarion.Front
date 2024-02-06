import useRequestPakageVisitScheduleAdd from "@/hooks/request-package/use-request-pakage-visit-Schedule-add";

const useSubmitNaft = () => {
    const addTime = useRequestPakageVisitScheduleAdd()

    return {addTime}
}
export default useSubmitNaft