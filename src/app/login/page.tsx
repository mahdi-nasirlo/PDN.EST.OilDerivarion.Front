"use client"

import React, {useEffect} from "react";
import ClientComponent from "@/app/login/components/clientComponent";

import {signOut, useSession} from "next-auth/react";

interface PropsType {
  searchParams: {
    callbackUrl?: string;
    code?: string;
  };
}

export default function Home(props: PropsType) {

    const session = useSession()

    useEffect(() => {

        if (session.status == "authenticated") {
            signOut().then()
        }
        // customeFetcher({
        //     url: {path: "/Sso/Logout"},
        //     method: "GET"
        // }).then((res) => {
        //
        //     console.log(res)
        //     signOut().then()
        //
        // })

    }, []);

  return (
    <>
      <ClientComponent
        code={props?.searchParams?.code}
        callbackUrl={props.searchParams.callbackUrl}
      />
    </>
  );
}
