"use client";

import React from "react";
import PrimaryLaboratoryListForm from "@/app/laboratory/request-list/components/primary-laboratory-list-form";
import PrimaryLaboratoryListable from "@/app/laboratory/request-list/components/primary-laboratory-list-table";


export default function Page() {
    return (
        <>
            <PrimaryLaboratoryListForm/>
            <PrimaryLaboratoryListable/>
        </>
    );
}
