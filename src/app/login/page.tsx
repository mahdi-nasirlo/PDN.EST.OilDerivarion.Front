import {Typography,} from "antd";
import Image from "next/image";
import React from "react";
import ThemeProvider from "../../../provider/theme-provider";
import {validateToken, ValidateTokenType} from "../../../request/validateToken";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOption} from "@/app/api/auth/[...nextauth]/route";
import getToken from "../../../request/getToken";
import {getCsrfToken} from "next-auth/react";
import LoginClient from "@/app/login/components/loginClient";

const redirectToSSoIfNotLogged = async (searchParams?: { code: string } & any) => {

  const result: { validate: boolean, data: ValidateTokenType | null } = await validateToken()

  if (!result.validate && result.data?.ssoUrl && !searchParams?.code) {

    const redirectUrl = `${process.env.NEXTAUTH_URL}${authOption.pages?.signIn}`

    const finalUrl = `${result.data?.ssoUrl}?clientId=${result.data?.clientId}&redirectUri=${redirectUrl}`

    redirect(finalUrl)

  }

}

const loggedFromSso = async (code: string, redirectUrl?: string) => {

  const token = await getToken(code, "")

  console.log(token)

  if (!token?.success) {
    await redirectToSSoIfNotLogged()
  }

  if (token?.success) {

    const csrfToken = getCsrfToken()

    return token.data.access_token
    // await signIn("credentials", {code: token.data.access_token})

  }

  return null

}

interface PropsType {
  searchParams: { callbackUrl?: string, code?: string }
}


export default async function Home(props: PropsType) {

  const session = await getServerSession()

  // console.log(session, getCookie("next-auth.callback-url"))
  // if (session) {
  //
  //   redirect(props.searchParams?.callbackUrl)
  //
  // }

  let tokenForLogged;
  if (props.searchParams.code) {

    tokenForLogged = await loggedFromSso(props.searchParams.code)

  }

  await redirectToSSoIfNotLogged(props.searchParams)

  return (
      <>
        <ThemeProvider>
          <div
              dir="rtl"
              className="bg-slate-100 flex justify-center items-center h-screen rounded-lg">
            <div className="bg-white p-8 rounded-3xl shadow-lg w-[550px] h-[630px] m-6">
              <div className="flex justify-center">
                <Image
                    height={250}
                    width={150}
                    alt="bell icon"
                    src="/static/standard.svg"
                    className="ml-4 max-lg:h-44 max-lg:w-28"
                />
              </div>
              <div className="mt-6 text-center">
                <Typography className="max-md:text-sm max-md:font-normal font-medium text-base p-2 text-gray-901">
                  لطفا اطلاعات خواسته شده را با دقت و به صورت صحیح وارد نمایید.
                </Typography>
              </div>
              {/*{JSON.stringify(tokenForLogged)}*/}
              <LoginClient token={tokenForLogged as string}/>
            </div>
          </div>
        </ThemeProvider>
      </>
  );
}
