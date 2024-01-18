"use client"

import { Spin } from "antd";
import ThemeProvider from "../../../../provider/theme-provider";
import { validateToken } from "../../../../request/validateToken";
import useGetToken from "../../../../hooks/sso/useGetToken";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";

const ClientComponent = ({
  code,
  callbackUrl,
}: {
  code: string | undefined;
  callbackUrl: string | undefined;
}) => {
  const session = useSession();

  const getToken = useGetToken()

  const { status, data, update } = session;

  useEffect(() => {

    if (status === "unauthenticated") {
      if (code) {
        // getToken

        getToken.trigger({
          code
        }).then((res: { token_type: string, access_token: string }) => {

          console.log(res)

          signIn("credentials", {
            code: `${res.token_type} ${res.access_token}`,
            callbackUrl: "/producer",
            redirect: true,
          });
        })


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
