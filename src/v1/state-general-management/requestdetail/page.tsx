"use client";


import React from 'react'
import PrimaryRequestsListForm from "@/app/state-general-management/requestdetail/components/primary-requests-form";
import {Divider} from "antd";
import PrimaryRequestsManagerTable
    from "@/app/state-general-management/requestdetail/components/primary-request-manager-table";
import PrimaryRequestLicenseInfoForm
    from "@/app/state-general-management/requestdetail/components/primary-request-license-info-form";
import PrimaryRequestAddressInfoForm
    from "@/app/state-general-management/requestdetail/components/primary-request-address-info-form";
import PrimaryRequestsProductionProcessTable
    from "@/app/state-general-management/requestdetail/components/primary-request-production-process-form";
import PrimaryRequestsLaboratoryEquipmentTable
    from "@/app/state-general-management/requestdetail/components/priamry-request-laboratory-equipment-table";
import PrimaryRequestsOtherOptionTableForm
    from "@/app/state-general-management/requestdetail/components/primary-requests-other-option-Table-form";
import PrimaryRequestsFinalProductForm
    from "@/app/state-general-management/requestdetail/components/primary-request-final-product-form";


export default function Page() {
    return (
        <>
            <div className="box-border w-full p-6">

                <PrimaryRequestsListForm/>
                <Divider/>
                <PrimaryRequestsManagerTable/>
                <PrimaryRequestLicenseInfoForm/>
                <PrimaryRequestAddressInfoForm/>
                <PrimaryRequestsProductionProcessTable/>
                <PrimaryRequestsLaboratoryEquipmentTable/>
                <PrimaryRequestsOtherOptionTableForm/>
                <PrimaryRequestsFinalProductForm/>

                {/*<PrimaryRequestsListTable/>*/}
            </div>
        </>
    )
}
