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
import VisitForm from './visit-form/page';


function Page() {

    const processController = useControlSteps()



    let CurrentStep

    switch (processController.step) {
        case 0:
            CurrentStep = <VisitForm />
            break;
        case 1:
            CurrentStep = <LaboratoryEquipments />
            break;
        case 2:
            CurrentStep = <CreatorProduction />
            break;
        case 3:
            CurrentStep = <ManagementInfo />
            break;
        case 4:
            CurrentStep = <PersonnelInfo />
            break;
        case 5:
            CurrentStep = <LicenseInfo />
            break;
        case 6:
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
                        title: "واحد تولیدی",
                    },
                    {
                        title: "تجهیزات آزمایشگاهی",
                    },
                    {
                        title: "فرم بازدید",
                    },
                    {
                        title: "مدیریتی",
                    },
                    {
                        title: "پرسنلی",
                    },
                    {
                        title: "مجوز",
                    },
                    {
                        title: "تماس",
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