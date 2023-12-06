import React from 'react';
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../lib/server/mutationFetcher";

const useGetToken = () => {

    return useSWRMutation("/Sso/GetToken", mutationFetcher)
}

export default useGetToken;