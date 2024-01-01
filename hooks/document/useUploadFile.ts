import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

interface triggerProp {
    file: any,
}

const useUploadFile = () => {

    const res = useSWRMutation("/Document/Upload2", mutationFetcher)

    const handleTrigger = (props: triggerProp) => {
        console.log(props)
        res.trigger(props)
    }

    return {...res, handleTrigger}
}

export default useUploadFile;