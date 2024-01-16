"use client";

import React from 'react'
import { formsUid } from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";

export default function Page() {

    return (
        <>
            {/* روش شیرین سازی */}
            <Resource categoryID={formsUid.sweetening} />
        </>
    )
}
