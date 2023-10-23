import React, {useContext} from 'react';
import {Button, Divider, Form, Typography} from "antd";
import FormulationFrom from "@/app/producer/dashboard/request/steps/step2/method1/formulation-from";
import {useForm} from "antd/es/form/Form";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import MaterialRequestDetailTable
    from "@/app/producer/dashboard/request/steps/step2/method2/material-request-detail-table";
import useCrudRequestDetailMaterial from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";
import {mutate} from "swr";
import {SvgIcon} from "@/components/layout/sidebar";

function Index() {

    const [form] = useForm()

    const processControl = useContext(StepContext)

    const requestDetailMaterial = useCrudRequestDetailMaterial()

    const handleOnFinish = async (value: any) => {

        value.requestMasterUid = processControl.requestMaster.requestMasterUid

        const res = await requestDetailMaterial.create.trigger(value, true)
        
        await mutate("/RequestDetail/GetPageMaterial")

    }

    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary">
                * برای وارد کردن درصد مواد اولیه تمامی اعداد را با حجمی یا وزنی وارد
                نمایید.
            </Typography>

            <Divider/>
            <Form
                disabled={requestDetailMaterial.create.isLoading}
                form={form}
                name="form_item_path"
                layout="vertical"
                onFinish={handleOnFinish}
            >
                <FormulationFrom/>
                <div className="flex justify-end">
                    <Button loading={requestDetailMaterial.create.isLoading} htmlType="submit">
                        ذخیره
                    </Button>
                </div>
            </Form>

            <MaterialRequestDetailTable/>

            <div className="flex gap-3 mt-5">
                <Button
                    onClick={() => processControl.dispatch({type: "GET_STEP", stepNumber: 4, step: 3})}
                    type="dashed"
                    className="bg-gray-100 w-full">
                    بازبینی نهایی
                </Button>
                <Button
                    className="w-full"
                    icon={<SvgIcon src="/static/save.svg"/>}
                    loading={processControl.isMutating}
                    size="large"
                    type="primary"
                    onClick={processControl.getStep3}
                >
                    ذخیره و ادامه
                </Button>
            </div>
        </>
    );
}

export default Index;