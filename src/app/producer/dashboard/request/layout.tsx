"use client";
import {Grid, Steps} from "antd";
import {useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const {useBreakpoint} = Grid;

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
                        title: "فرآیند تولید",
                        description: "شرح فرایند",
                    },
                    {
                        title: "فرمولاسیون",
                        description: "تولید محصول",
                    },
                    {
                        title: "محصول نهایی",
                        description: "انتخاب محصول نهایی",
                    },
                    {
                        title: "بازبینی",
                        description: "بازبینی نهایی",
                    },
                ]}
            />
            <div className="box-border w-full mt-4 p-6">{children}</div>
        </>
    );
}

const stepLinks: { number: number; href: string }[] = [
    {number: 0, href: "/producer/dashboard/request/production-process"},
    {number: 1, href: "/producer/dashboard/request/formulacion"},
    {number: 2, href: "/producer/dashboard/request/final-product"},
    {number: 3, href: "/producer/dashboard/request/final-preview"},
];