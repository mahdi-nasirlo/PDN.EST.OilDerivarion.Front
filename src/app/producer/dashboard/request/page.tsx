"use client"

import React from 'react';
import {Steps} from "antd";
import Step1 from "@/app/producer/dashboard/request/steps/Step1";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useControlProcess from "@/app/producer/dashboard/request/state-managment/useControlProcess";
import Step2Method1 from "@/app/producer/dashboard/request/steps/step2/method1";
import Step3Method1 from "@/app/producer/dashboard/request/steps/step3/method1";


function Page() {

    const processController = useControlProcess()

    let CurrentStep

    switch (processController.step) {
        case 0:
            CurrentStep = <Step1/>
            break;
        case 1:

            if (processController.requestMaster.productionMethodId === 1)
                CurrentStep = <Step2Method1/>

            // if (processController.requestMaster.productionMethodId === 2)
            //     CurrentStep = <Method/>
            break;
        case 2:

            if (processController.requestMaster.productionMethodId === 1)
                CurrentStep = <Step3Method1/>

            break;

        default:
            CurrentStep = <></>
    }

    return (
        <>
            <Steps
                // progressDot={progressDot}
                current={processController.step}
                // onChange={onChange}
                className="pb-0 lg:pb-4"
                items={[
                    {
                        title: "فرآیند تولید",
                        description: "شرح فرایند",
                    },
                    {
                        title: "فرمولاسیون",
                        description: "تولید محصول",
                    },
                    {
                        title: "محصول نهایی",
                        description: "انتخاب محصول نهایی",
                    },
                    {
                        title: "بازبینی",
                        description: "بازبینی نهایی",
                    },
                ]}
            />


            <div className="box-border w-full mt-4 p-6">
                <StepContext.Provider value={processController}>
                    {CurrentStep}
                    {/*{processController.step === 0 && <Step1/>}*/}
                    {/*{step === 1 &&} <St*/}
                </StepContext.Provider>
            </div>
        </>
    );
}


export default Page;