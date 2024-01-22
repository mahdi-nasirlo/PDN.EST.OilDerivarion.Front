"use client";

import React from "react";
import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider as TanstackQueryClientProvider
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
// import { GeneralResponseType } from "@/types/api-response";
// import toast from "react-hot-toast";
// import { GeneralResponseType } from "../@types/api-response/general";



const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {

    const session = useSession()

    const queryClient = new QueryClient({
        // queryCache: new QueryCache({
        //     onSuccess: (data: unknown) => {

        //         const result = data as GeneralResponseType

        //         if (result?.message) {
        //             // toast.error(result?.message)
        //         }
        //     },
        // }),
        // mutationCache: new MutationCache({
        //     // onMutate: () => toast.loading("loading...", { ...toastConf }),
        //     onSuccess: (data: unknown) => {
        //         console.log(data)
        //         // @ts-ignore
        //         if (data?.success) {
        //             // @ts-ignore
        //             toast.success(data?.message || "successfully operation", { ...toastConf })
        //         } else
        //             // @ts-ignore
        //             toast.error(data?.message || data?.error || "unsuccessfully operation", { ...toastConf })
        //     },
        //     onError: error => {
        //         console.log(error);

        //         // toast.error(error?.message + "test" || "somethings wrong !", { ...toastConf })
        //     }
        // })
    });

    return (
        // <AuthProvider
        <TanstackQueryClientProvider client={queryClient}>
            {children}
        </TanstackQueryClientProvider>
    );
};

export default QueryClientProvider;
