"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Spin } from "antd";
import ThemeProvider from "../../../../provider/theme-provider";
import { validateToken } from "../../../../request/validateToken";

const ClientComponent = ({
  code,
  callbackUrl,
}: {
  code: string | undefined;
  callbackUrl: string | undefined;
}) => {
  const session = useSession();

  const { status, data } = session;

  useEffect(() => {
    if (status === "unauthenticated") {
      if (code) {
        signIn("credentials", {
          code: code,
          callbackUrl: "/producer",
          redirect: true,
        });
      } else {
        const validate = validateToken(callbackUrl);
      }
    }
  }, [status]);

  return (
    <ThemeProvider>
      <Spin
        spinning={status === "loading"}
        className="flex justify-center items-center w-full h-[100vh]"
      >
        <div>{JSON.stringify(session)}</div>
      </Spin>
    </ThemeProvider>
  );
};

export default ClientComponent;
