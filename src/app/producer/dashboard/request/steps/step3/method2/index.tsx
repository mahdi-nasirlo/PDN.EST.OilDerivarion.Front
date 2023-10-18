import React, {useContext} from 'react';
import {Button, Divider, Form, Typography} from "antd";
import SelectProductForm from "@/app/producer/dashboard/request/steps/step3/method1/select-product-form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";

const Index = () => {

    const processController = useContext(StepContext)

    const requestDetailProduct = useCrudRequestDetailProduct()

    const handleOnFinish = async (value: any) => {

        value.requestMasterUid = processController.requestMaster.requestMasterUid

        await requestDetailProduct.create.trigger(value, false)

        await processController.getStep4()

    }

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                محصول تولیدی
            </Typography>

            <Form onFinish={handleOnFinish}>
                <SelectProductForm/>
                <Divider/>
                <div className="flex gap-3">

                    <Button onClick={() => processController.dispatch({type: "PREVIOUS"})} type="dashed"
                            className="bg-gray-100 w-full">
                        مرحله قبلی
                    </Button>

                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        ذخیره و ادامه
                    </Button>

                </div>
            </Form>
        </>
    );
};

export default Index;