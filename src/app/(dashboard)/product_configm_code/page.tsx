"use client"

import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline'
import { Card } from 'antd/lib'
import React from 'react'
import DataTable from './components/data-table'
import Breadcrumb from "@/components/breadcrumb";

export default function page() {
    return (
        <div>
            <Breadcrumb
                titleIcon={<ClipboardDocumentCheckIcon className="w-8" />}
                pages={[{ label: "خانه", path: "/" }]}
                currentPage={"کدهای محصول تایید شده"}
            />
            <Card>
                <DataTable />
            </Card>
        </div>
    )
}
