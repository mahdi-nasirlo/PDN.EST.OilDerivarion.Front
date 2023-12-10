import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";
import {z} from "zod";

const SubmitType = z.object({
    uid: z.string(),
    expertOpinionTypeId: z.number(),
    description: z.string()
})

const UseRequestDetailCreateOilExpertOpinion = () => {

    const request = useSWRMutation("/RequestDetail/setOilExpertOpinion", mutationFetcher)

    const handleTrigger = (props: z.infer<typeof SubmitType>) => {
        console.log(props)
        return request.trigger(props)
    }

    return {...request, handleTrigger}
};

export default UseRequestDetailCreateOilExpertOpinion;