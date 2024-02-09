import React from 'react'
import MapViewer from '@/components/map-viewer'
import Breadcrumb from "@/components/breadcrumb";
import { MapPinIcon } from '@heroicons/react/24/solid';
import { Card } from '@/components/card';


export default function Page() {
    return (
        <>
            <Breadcrumb
                titleIcon={<MapPinIcon className="w-8" />}
                pages={[
                    { label: "خانه", path: "/" },
                    { label: 'لیست جعبه ها', path: '/gps_device' },
                ]}
                currentPage={"موقعیت جعبه"}
            />
            <Card>
                <div className="w-full border-2 border-CustomizeBlue-500 rounded-md">
                    <MapViewer height="560px" SecondReload={30} />
                </div>
            </Card>
        </>
    )
}
