import { Skeleton } from 'antd'
import React from 'react'

export default function MenuSkeleton() {
    return (
        <div className="flex flex-col gap-4 sidebar-Skeleton">
            <Skeleton active />
            <Skeleton.Input className="w-full" active size="small" />
            <Skeleton.Input active className="w-2/3" size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton active />
            <Skeleton.Input className="w-full" style={{ marginTop: "8px" }} active size="small" />
            <Skeleton.Input className="w-full" active size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input className="w-full" style={{ marginTop: "8px" }} active size="small" />
            <Skeleton.Input active className="w-1/2" size="small" />
            <Skeleton.Input className="w-full" active size="small" />
        </div>
    )
}
