import React, {useContext} from 'react';
import {Divider, Form, Typography} from "antd";
import SelectProductForm from "@/app/producer/dashboard/request/steps/step3/method1/select-product-form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";

const Index = () => {

    const processController = useContext(StepContext)

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                محصول تولیدی
            </Typography>

            <Form onFinish={processController.getStep4}>
                <SelectProductForm/>
            </Form>
        </>
    );
};

export default Index;