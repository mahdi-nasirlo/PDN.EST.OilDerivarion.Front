import useSWRMutation from "swr/mutation";
import { mutationFetcher } from "../../lib/server/mutationFetcher";
import { z } from "zod";

const TriggerType = z
  .object({
    requestDetailUId: z.string(),
  })
  .required();

export default function useProductGetCode() {
  const request = useSWRMutation("/ProductCode/GetCode", mutationFetcher);

  const handleTrigger = (props: z.infer<typeof TriggerType>) => {
    return request.trigger(props);
  };

  return { ...request, handleTrigger };
}
