"use client"

import { usePathname } from "next/navigation";
import { Breadcrumb } from "antd";
import { routDictionary } from "./rout-dictionary";

export default function LayoutBreadcrumb() {
    const path = usePathname();
    const pathname = path.split('/').filter(path => path);

    return (
        <>
            <Breadcrumb items={generateObjects(pathname)} />
        </>
    )
}

const generateObjects = (keys: string[]) => {
    return keys.map((key: string) => {

        if (routDictionary[key]) {
            return routDictionary[key]
        } else {
            return {
                title: key,
                href: `/${key}`
            }
        }

    });
};