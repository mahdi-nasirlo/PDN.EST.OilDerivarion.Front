import React, {useContext} from 'react';
import {Divider, Form, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import FormulationFrom from "@/app/producer/dashboard/request/steps/step2/method1/formulation-from";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";

function Index() {

    const [form] = useForm()

    const processControl = useContext(StepContext)

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
                form={form}
                // disabled={requestDetailMaterial.create.isLoading}
                name="form_item_path"
                layout="vertical"
                onFinish={processControl.getStep3}
            >
                <FormulationFrom/>
            </Form>
        </>
    );
}

export default Index;