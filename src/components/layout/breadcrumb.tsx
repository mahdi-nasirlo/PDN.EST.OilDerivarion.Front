"use client"

import {usePathname} from "next/navigation";
import {Breadcrumb} from "antd";

export default function LayoutBreadcrumb() {
    const path = usePathname();
    const pathname = path.split('/').filter(path => path);

    return (
        <>
            <Breadcrumb items={generateObjects(pathname)}/>
        </>
    )
}


const items: Items = {
    "dashboard": {
        title: "پیشخوان"
    },

    // start producer pannel
    "producer": {
        title: "پنل تولید کننده",
        href: "/producer"
    },
    "request-list": {
        title: "لیست درخواست ها",
        href: "/producer/dashboard/request-list"
    },
    "request": {
        title: "ثبت درخواست",
    },
    "production-process": {
        title: "مرحله اول",
    },
    "formulacion": {
        title: "مرحله دوم",
    },
    "final-product": {
        title: "مرحله سوم",
    },
    "final-preview": {
        title: "مرحله چهارم",
    },
    "base-info": {
        title: "اطلاعات اولیه"
    },
    "creator-production": {
        title: "اطلاعات واحد تولیدی",
    },
    "management-info": {
        title: "اطلاعات مدیریتی",
    },
    "personnel-info": {
        title: "اطلاعات پرسنلی",
    },
    "license-info": {
        title: "اطلاعات مجوز",
    },
    "contact-info": {
        title: "اطلاعات تماس",
    },
    // end producer pannel
    "admin-pannel": {
        title: "سامانه تولید کننده",
        href: "/admin-pannel"
    },
    "state-general-management": {
        title: "سامانه اداره کل استان",
        href: "/state-general-management"
    }
};

interface Items {
    [key: string]: {
        title: string;
        href?: string;
    };
}

const generateObjects = (keys: string[]) => {
    return keys.map((key: string) => {

        if (items[key]) {
            return items[key]
        } else {
            return {
                title: key,
                href: `/${key}`
            }
        }

    });
};