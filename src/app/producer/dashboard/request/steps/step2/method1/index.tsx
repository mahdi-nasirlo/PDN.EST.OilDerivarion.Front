import React, {useContext} from 'react';
import {Button, Col, Divider, Form, Row, Typography} from "antd";
import {useForm} from "antd/es/form/Form";
import FormulationFrom from "@/app/producer/dashboard/request/steps/step2/method1/formulation-from";
import StepContext from "@/app/producer/dashboard/request/state-managment/step-context";
import useCrudRequestDetailMaterial from "../../../../../../../../hooks/requestDetail/useCrudRequestDetailMaterial";
import {SvgIcon} from "@/components/layout/sidebar";

function Index() {

    const [form] = useForm()

    const processControl = useContext(StepContext)

    const crudMaterialRequestDetail = useCrudRequestDetailMaterial()

    const handleSubmit = async (value: any) => {

        value.requestMasterUid = processControl.requestMaster.requestMasterUid;

        await crudMaterialRequestDetail.create.trigger(value)

        await processControl.getStep3()

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
                form={form}
                disabled={crudMaterialRequestDetail.create.isLoading || processControl.isMutating}
                name="form_item_path"
                layout="vertical"
                onFinish={handleSubmit}
            >
                <FormulationFrom/>
                <Divider/>
                <Row gutter={[12, 12]}>
                    <Col span={24}>
                        <Button
                            className="w-full"
                            icon={<SvgIcon src="/static/save.svg"/>}
                            loading={crudMaterialRequestDetail.create.isLoading || processControl.isMutating}
                            size="large"
                            type="primary"
                            htmlType="submit"
                        >
                            ذخیره
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}

export default Index;