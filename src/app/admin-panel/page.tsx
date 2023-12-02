"use client"

import { Tabs, Typography } from "antd";
import { useState } from "react";
import useGetBaseInfo from "../../../hooks/producer/useGetBaseInfo";
import DataViewer from '../../../components/FormBuilder/DataViewer'

const ClientForm = ({ label }: any) => {
    // Implement your form logic here
    return (
        <div>
            <Typography>{label} Form</Typography>
            {/* Add your form components and logic here */}
        </div>
    );
};

export default function Manufacturer() {

    const [activeKey, setActiveKey] = useState(); // State to manage the active tab

    const onChange = (key: any) => {
        console.log(key);
        setActiveKey(key);
    };

    const test = [
        {
            label: "تجهیزات ازمایشگاه",
            test12: "تجهیزات ازمایشگاه",
        },
        {
            label: "اطلاعات مخازن",
            key: 2,
            test12: "اطلاعات مخازن",
        },
        {
            label: "اطلاعات خط برش",
            key: 3,
            test12: "اطلاعات خط برش",
        },
    ];

    const items = test.map((item, i) => ({
        label: item.label,
        key: String(item.key || i + 1),
        children: <ClientForm label={item.label} />,
    }));

    const getInfo = useGetBaseInfo();

    return (
        <div className="box-border w-full mt-8 p-6 text-gray-900">
            <Typography className="text-right text-2xl font-bold">
                پنل ادمین
            </Typography>
            <div className="mt-10">
                {/* <Tabs
                    size="large"
                    activeKey={activeKey}
                    onChange={onChange}
                    type="card"
                >
                    {items.map((item) => (
                        <Tabs.TabPane tab={item.label} key={item.key}>
                            {item.children}
                        </Tabs.TabPane>
                    ))}
                </Tabs> */}
                <DataViewer data={getInfo.data || {}} />
            </div>
        </div>
    );
}
