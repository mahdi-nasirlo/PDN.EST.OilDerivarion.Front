"use client";

import React from 'react'
import { formsUid } from "../../../../../Constants/formsUid";
import Resource from "../../../../../components/Resource";

export default function Page() {

    return (
        <>
            {/*  اطلاعات مخازن مواد اولیه  */}
            <Resource categoryID={formsUid.mix_blending_tank_information} />
        </>
    )
}
