import {Breadcrumb} from "antd";

export default function LayoutBreadcrumb() {
    return (
        <Breadcrumb
            separator="/"
            items={items}
        />
    )
}

const items = [
    {
        title: 'خانه',
    },
    {
        title: 'ثبت درخواست جدید',
    },
];