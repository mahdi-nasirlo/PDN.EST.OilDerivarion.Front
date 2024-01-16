"use client";

import React from 'react'
import { formsUid } from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";

export default function Page() {


    return (
        <>
            {/* مشخصات راکتور */}
            <Resource categoryID={formsUid.reactor_specifications} />
        </>
    )
}
