"use client";

import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { Spin, Typography } from "antd";
import ThemeProvider from "../../../../provider/theme-provider";
import { validateToken } from "../../../../request/validateToken";
import useGetToken from "../../../../hooks/sso/useGetToken";

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
      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
        <Typography
          className='text-center font-bold text-xl'
        >
          در حال انتقال به صفحه هستید
        </Typography>
        <Spin
          className='flex justify-center items-center mt-5'
          size='large'
        >

        </Spin>
      </div>
    </ThemeProvider>
  );
};

export default ClientComponent;
