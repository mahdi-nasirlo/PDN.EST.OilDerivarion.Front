import { generalResponseZod } from "@/types/api-response";
import { z } from "zod";

const basicApi = {
    getStep: {
        url: "/Basic/GetSteps",
        response:generalResponseZod.extend({
           data:z.array(z.object({
           })) 
        })     
    },
}
    export default  basicApi;