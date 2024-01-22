import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import ThemeProvider from "../../../provider/theme-provider";
import { RedirectInClient } from "./components/redirectInClient";
import ClientComponent from "./components/clientComponent";

interface PropsType {
  searchParams: {
    callbackUrl?: string;
    code?: string;
  };
}

export default async function Home(props: PropsType) {
  const session = await getServerSession();

  if (session) {
    return (
      <ThemeProvider>
        <div className="flex justify-center items-center w-full h-[100vh]">
          <RedirectInClient />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <>
      <ClientComponent
        code={props?.searchParams?.code}
        callbackUrl={props.searchParams.callbackUrl}
      />
    </>
  );
}