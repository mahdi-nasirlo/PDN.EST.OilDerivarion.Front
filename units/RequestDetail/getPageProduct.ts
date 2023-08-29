import { getCookie } from 'cookies-next';
import { RequestMaster } from './../../src/app/dashboard/request/production-process/page';
import { AxiosResponse } from 'axios';
import { customRequest } from '../../lib/customRequest';



export async function getPageProduct({}) {
    const requestMasterUid =getCookie("RequestMasterUid")
    

try {
    const res:AxiosResponse =await customRequest.post(`/api/RequestDetail/getPageProduct`,{requestMasterUid:requestMasterUid}

    )
     return res.data.data
    
} catch (error) {
    console.error("Error:", error);
}


}