"use client";


import React from 'react'
import PrimaryProducerDetailsForm from './components/primary-producer-details-form';
import PrimaryProducerDetailsCeoTable from './components/primary-producer-details-ceo-table';
import PrimaryProducerDetailsPersonnelTable from './components/primary-producer-details-personnel-table';
import PrimaryProducerDetailsLicenseTable from './components/primary-producer-details-license-table';
import PrimaryProducerDetailsAddressForm from './components/primary-producer-details-address-form';

export default function Page() {
    return (
        <>
            <div className="box-border w-full p-6">
                <PrimaryProducerDetailsForm />
                <PrimaryProducerDetailsCeoTable />
                <PrimaryProducerDetailsPersonnelTable />
                <PrimaryProducerDetailsLicenseTable />
                <PrimaryProducerDetailsAddressForm />
            </div>
        </>
    )
}
