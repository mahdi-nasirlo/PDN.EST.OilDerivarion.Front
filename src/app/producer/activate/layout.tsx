"use client";


import { Grid, Steps } from 'antd';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const { useBreakpoint } = Grid;


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const currentNumber = stepLinks.find(
        (step) => step.href === pathname
    )?.number;

    const [current, setCurrent] = useState(currentNumber);
    const router = useRouter();

    const onChange = (value: number) => {
        let currentLink = stepLinks.find((step) => step.number === value)?.href;

        router.push(`${currentLink}`);
        setCurrent(value);
    };

    const screens = useBreakpoint();
    const isLgSize = screens.lg;

    const progressDot = (isLgSize !== true);

    useEffect(() => {
        setCurrent(currentNumber);
    }, [currentNumber, pathname]);

    return (
        <>
            <Steps
                progressDot={progressDot}
                current={current}
                onChange={onChange}
                className="pb-0 lg:pb-4"
                items={[
                    {
                        title: "اطلاعات واحد تولیدی",
                    },
                    {
                        title: "اطلاعات مدیریتی",
                    },
                    {
                        title: "اطلاعات پرسنلی",
                    },
                    {
                        title: "اطلاعات مجوز",
                    },
                    {
                        title: "اطلاعات تماس",
                    },
                ]}
            />
            <div className="box-border w-full mt-4 p-6">{children}</div>
        </>
    );
}

const stepLinks: { number: number; href: string }[] = [
    { number: 0, href: "/producer/activate/creator-production" },
    { number: 1, href: "/producer/activate/management-info" },
    { number: 2, href: "/producer/activate/personnel-info" },
    { number: 3, href: "/producer/activate/license-info" },
    { number: 4, href: "/producer/activate/contact-info" },

];
