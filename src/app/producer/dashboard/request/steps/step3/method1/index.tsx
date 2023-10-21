import React, {useContext} from 'react';
import {Button, Divider, Form, Typography} from "antd";
import SelectProductForm from "@/app/producer/dashboard/request/steps/step3/method1/select-product-form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import ProductRequestTable from "@/app/producer/dashboard/request/steps/step3/method1/product-request-table";
import useCrudRequestDetailProduct from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailProduct";
import {mutate} from "swr";

const Index = () => {

    const processController = useContext(StepContext)

    const requestDetailProduct = useCrudRequestDetailProduct()

    const handleOnFinish = async (value: any) => {

        value.requestMasterUid = processController.requestMaster.requestMasterUid

        await requestDetailProduct.create.trigger(value)

        await mutate("/RequestDetail/GetPageProduct")

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

            <Form disabled={requestDetailProduct.create.isLoading || processController.isMutating}
                  onFinish={handleOnFinish}>
                <SelectProductForm/>
                <div className="flex justify-end">
                    <Button loading={requestDetailProduct.create.isLoading} htmlType="submit">
                        ذخیره
                    </Button>
                </div>
            </Form>

            <Divider/>

            <ProductRequestTable/>

            <Divider/>


            <div className="flex gap-3">

                <Button
                    onClick={() => processController.dispatch({type: "GET_STEP", stepNumber: 4, step: 3})}
                    type="dashed"
                    className="bg-gray-100 w-full">
                    بازبینی نهایی
                </Button>

                <Button onClick={() => processController.dispatch({type: "PREVIOUS"})} type="dashed"
                        className="bg-gray-100 w-full">
                    مرحله قبلی
                </Button>

                <Button
                    loading={requestDetailProduct.create.isLoading || processController.isMutating}
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    onClick={() => processController.getStep4()}
                >
                    مرحله بعد
                </Button>

            </div>
        </>
    );
};

export default Index;