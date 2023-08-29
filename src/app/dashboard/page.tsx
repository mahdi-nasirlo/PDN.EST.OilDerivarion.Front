import DisplayData from "@/app/dashboard/components/showData";
import {Typography} from "antd";
import Link from "next/link";


export default async function Home() {

    const data = await getData()


    return (
        <>
            <div className="box-border w-full mt-8 p-6 max-md:p-2 mt-3">
                <DisplayData data={data}/>
                <div className="flex">
                    <Typography className="text-1xl">
                        ورود به پنل
                    </Typography>
                    <Typography>
                        <Link className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                              href="/manufacturer">
                            رییس اجرایی
                        </Link>
                    </Typography>
                </div>
                <div className="flex">
                    <Typography className="text-1xl">
                        ورود به پنل
                    </Typography>
                    <Typography>
                        <Link className="mx-2 underline-offset-2 text-primary-500 text-1xl font-extrabold"
                              href="/admin-pannel">
                            ادمین
                        </Link>
                    </Typography>
                </div>
            </div>
        </>
    )
}

async function getData() {

    // const cookieStore = cookies()
    // const token = cookieStore.get('accessToken')?.value

    // const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/security/getId`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": 'application/json',
    //         "Authorization": `Bearer ${token}`
    //     }
    // })

    // if (res.ok) {
    //     return res.json()
    // }

    return null
}