import React from 'react'
import Breadcrumb from "@/components/breadcrumb";
import { DocumentChartBarIcon } from '@heroicons/react/24/solid';
import { Alert, Card, Divider } from 'antd';
import SubmitForm from './components/submit-form';


export default function Page() {
    return (
        <div>
            <Breadcrumb
                pages={[{ label: "خانه", path: "/" }]}
                currentPage="تاریخچه گزارشات نقش"
                titleIcon={<DocumentChartBarIcon className="w-8" />}
            />
            <Card>
                <Alert
                    className="text-blue-800 text-right"
                    message="ابتدا نقش مورد نظر خود را انتخاب کرده و سپس با استفاده از ستون سمت راست   “گزارشات انتخاب نشده”   بخش های مورد نظر را به ستون سمت چپ   “گزارشات انتخاب شده”   انتقال دهید."
                    type="info"
                />
                <Divider />

                <SubmitForm />
            </Card>
        </div>
    )
}
