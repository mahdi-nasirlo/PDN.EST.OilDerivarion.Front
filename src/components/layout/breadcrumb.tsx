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

    // start producer panel
    "producer": {
        title: "پنل تولید کننده",
        href: "/producer"
    },
    "request-list": {
        title: "لیست درخواست ها",
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
    // end producer panel

    // start manufacturer panel
    "manufacturer": {
        title: "پنل رئیس اجرایی",
        href: "/manufacturer"
    },
    "creator-list": {
        title: "لیست تولید کنندگان",
    },
    "lab-results-list": {
        title: "نتایج آزمایشگاه",
    },
    // end manufacturer panel

    // start state-general-management panel
    "state-general-management": {
        title: "سامانه اداره کل استان",
        href: "/state-general-management"
    },
    "delays-list": {
        title: "تاخیرها"
    },
    "requestdetail": {
        title: "جزئیات درخواست"
    },
    // end state-general-management panel

    // start state-org-manager panel
    "state-org-manager": {
        title: "پنل اداره کل استان"
    },
    "producer-list": {
        title: "لیست تولید کنندگان"
    },
    "producer-details": {
        title: "جزئیات تولید کنندگان"
    },
    "experts-list": {
        title: "لیست کارشناسان"
    },
    "experts-details": {
        title: "جزئیات کارشناسان"
    },
    "expired-requests-list": {
        title: "درخواست های منقضی شده"
    },
    "expired-requests-details": {
        title: "جزئیات درخواست های منقضی شده"
    },
    "laboratory-results-list": {
        title: "نتایج آزمایشگاه"
    },
    "lab-results-details": {
        title: "جزئیات نتایج آزمایشگاه"
    },
    // end state-org-manager panel

    // start provincial-working-group panel
    "provincial-working-group": {
        title: "پنل کارگروه استان",
        href: "/provincial-working-group"
    },
    "request-details": {
        title: "جزئیات درخواست"
    },
    "Invitations": {
        title: "دعوت نامه ها"
    },
    "visit-reports": {
        title: "گزارشات بازدید"
    },
    // start provincial-working-group panel

    // start laboratory panel
    "laboratory": {
        title: 'پنل آزمایشگاه',
        href: "/laboratory"
    },
    "accepted-requests": {
        title: "درخواست های پذیرفته شده"
    },
    "list": {
        title: "لیست"
    },
    "report": {
        title: "ارسال گزارش"
    },
    "gps-confirmations": {
        title: "تاییدیه های GPS"
    },
    // end laboratory panel

    // start admin panel
    "admin-panel": {
        title: "سامانه تولید کننده",
        href: "/admin-panel"
    },
    "add-box": {
        title: "افزودن جعبه"
    },
    "adding-raw-material": {
        title: "مواد اولیه"
    },
    "category-list": {
        title: "لیست دسته بندی"
    },
    "confirm-changes": {
        title: "ثبت تغییرات"
    },
    "labratory-factor": {
        title: "فاکتور های آزمایشگاه"
    },
    "list-experts": {
        title: "لیست کارشناسان"
    },
    "management-user": {
        title: "مدیریت کاربران"
    },
    "management-user-role": {
        title: "نقش کاربران"
    },
    "products-factor": {
        title: "فاکتور های محصول"
    },
    "products-list": {
        title: "لیست محصولات"
    },
    "province": {
        title: "استان"
    },
    "raw-product-factor": {
        title: "مواد اولیه محصول"
    },
    "test-factors": {
        title: "فاکتور های آمون"
    },
    "test-feature": {
        title: "استاندارد های آزمون"
    },
    "test-result": {
        title: "نتایج آزمون"
    },
    "test-result-record": {
        title: "ثبت نتایج آزمایشگاه"
    }
    // end admin panel
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