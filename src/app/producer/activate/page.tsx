"use client"

import React from 'react';
import { Steps } from "antd";
import StepContext from "@/app/producer/activate/stete-manager/step-context";
import useControlSteps from './stete-manager/useControlSteps';
import CreatorProduction from './creator-production/creator-production';
import ManagementInfo from './management-info/management-info';
import PersonnelInfo from './personnel-info/personnel-info';
import LicenseInfo from './license-info/license-info';
import ContactInfo from './contact-info/contact-info';
import LaboratoryEquipments from './laboratory-equipments/laboratory-equipments';


function Page() {

    const processController = useControlSteps()



    let CurrentStep

    switch (processController.step) {
        case 0:
            CurrentStep = <CreatorProduction />
            break;
        case 1:
            CurrentStep = <LaboratoryEquipments />
            break;
        case 2:
            CurrentStep = <ManagementInfo />
            break;
        case 3:
            CurrentStep = <PersonnelInfo />
            break;
        case 4:
            CurrentStep = <LicenseInfo />
            break;
        case 5:
            CurrentStep = <ContactInfo />
            break;
        default:
            CurrentStep = <></>
    }

    return (
        <>
            <Steps
                current={processController.step}
                className="pb-0 lg:pb-4"
                items={[
                    {
                        title: "اطلاعات واحد تولیدی",
                    },
                    {
                        title: "تجهیزات آزمایشگاهی",
                    },
                    {
                        title: "اطلاعات مدیریتی",
                    },
                    {
                        title: "اطلاعات پرسنلی",
                    },
                    {
                        title: "اطلاعات مجوز",
                    },
                    {
                        title: "اطلاعات تماس",
                    },
                ]}
            />

            <div className="box-border w-full mt-4 p-6">
                <StepContext.Provider value={processController}>
                    {CurrentStep}
                </StepContext.Provider>
            </div>
        </>
    );
}

export default Page;