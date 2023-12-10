import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {z} from "zod";


const TriggerType = z.object({
    "uid": z.string(),
    "expertOpinionTypeId": z.number(),
    "description": z.string()
}).required()

const UseRequestDetailCreateStandardExpertOpinion = () => {

    const request = useSWRMutation("/RequestDetail/setSamtExpertOpinion", mutationFetcher)

    const handleTrigger = (props: z.infer<typeof TriggerType>) => {
        return request.trigger(props)
    }

    return {...request, handleTrigger}
};

export default UseRequestDetailCreateStandardExpertOpinion;