import React from "react";
import ClientComponent from "@/app/login/components/clientComponent";
import {getServerSession} from "next-auth";

interface PropsType {
    searchParams: {
        callbackUrl?: string,
        code?: string
    }
}

export default async function Home(props: PropsType) {

    const session = await getServerSession()

    // if (props.searchParams.code) {
    //
    //     return <ClientComponent code={props?.searchParams?.code} callbackUrl={props.searchParams.callbackUrl}/>
    //
    // }
    //
    // if (!session) {
    //
    //     const redirectTo = props.searchParams?.callbackUrl
    //
    //     const validate = await validateToken(redirectTo)
    //
    // }

    return (
        <>
            <ClientComponent code={props?.searchParams?.code} callbackUrl={props.searchParams.callbackUrl}/>
        </>
    );
}
