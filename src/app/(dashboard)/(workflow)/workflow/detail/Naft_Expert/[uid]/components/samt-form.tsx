import {Divider, Form, Typography} from "antd";
import React from "react";
import {FormTime} from "@/app/(dashboard)/(workflow)/workflow/detail/Naft_Expert/[uid]/components/form-time";

export const SamtForm = () => {
    return (
        <>
            <div className="mb-5">
                <Typography className="text-right text-[16px] font-bold text-orange-300">
                    نماینده صمت
                </Typography>
            </div>
            <Form disabled={true} layout="vertical">
                <FormTime/>
            </Form>
            <Divider/>
        </>
    );
};
