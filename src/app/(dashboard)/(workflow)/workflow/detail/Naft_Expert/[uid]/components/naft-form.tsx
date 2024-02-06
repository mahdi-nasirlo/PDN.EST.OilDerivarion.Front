import {Divider, Typography} from "antd";
import React from "react";
import useSubmitNaft from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/hook/use-submit-naft";
import {useValidation} from "@/hooks/use-validation";
import {RequestPackageApi} from "../../../../../../../../constance/request-package";
import {Form} from "antd/lib";
import {FormTime} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";

const apiData = RequestPackageApi.VisitScheduleAdd
export const NaftForm = () => {
    const {addTime} = useSubmitNaft()
    const [form, ruls] = useValidation(RequestPackageApi.VisitScheduleAdd.type)
    const handleSubmit = (values: any) => {


    }
    return (
        <>
            <div className="mb-5">
                <Typography className="text-right text-[16px] font-bold text-orange-300">
                    نماینده نفت
                </Typography>
            </div>
            <Form
                form={form}
                // onFinish={}
                layout="vertical"
            >
                <FormTime/>
            </Form>
            <Divider/>
        </>
    );
};
