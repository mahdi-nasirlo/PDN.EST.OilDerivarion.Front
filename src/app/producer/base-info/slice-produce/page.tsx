"use client";

import React from 'react'
import Resource from "../../../../../components/Resource";
import { formsUid } from "../../../../../Constants/formsUid";

export default function Page() {


    return (
        <>
            {/* خط تولید برش گیری */}
            <Resource categoryID={formsUid.cutting_production_line} />
        </>
    )
}
