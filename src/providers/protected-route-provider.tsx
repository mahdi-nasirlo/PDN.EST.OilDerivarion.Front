"use client"

import React, {useEffect, useState} from 'react';
import {useGetUserAccess} from "@/hooks/sso/use-get-user-access";
import {usePathname, useRouter} from "next/navigation";
import {notification, Spin} from "antd/lib";

const ProtectedRouteProvider = ({children}: { children: React.ReactNode }) => {

    const pathname = usePathname()

    const router = useRouter()

    const accessPages = useGetUserAccess()

    const [access, setAccess] = useState(false)

    useEffect(() => {

        if (accessPages.isFetched) {

            const filter = accessPages.data?.filter((item) => item.label.includes(pathname))

            if (filter && Array.isArray(filter) && filter.length <= 0 && pathname !== "/") {
                router.push("/")
                notification.error({message: "access denise"})
            }

            setAccess(true)

        }

    }, [accessPages.data, accessPages.isFetching, pathname])

    return access ? children : <div
        className="w-full flex rounded-lg bg-no-repeat bg-cover bg-bottom "
    >
        <Spin className="w-full h-full"/>
    </div>
};

export default ProtectedRouteProvider;