import {Button, Col, Form, Spin, Typography} from "antd/lib";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import useUiEstLabSelect
    from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/hook/use-ui-est-lab-select";
import {errorMessage} from "../../../../../../../../constance/error-message";

const BoxCardAdd = ({package_uid}: { package_uid: string }) => {

    const {handleAddBox, labBoxAdd, form, boxAvailable} = useUiEstLabSelect({package_UID: package_uid})

    return (
        <Col xs={24} md={12} xl={8} xxl={6}>
            <Spin spinning={labBoxAdd.isPending}>
                <div
                    className="min-h-[717px] w-full border-2 border-dashed border-primary-500 p-4 rounded-2xl flex flex-col justify-between space-y-4">
                    <Typography className="font-semibold text-lg">افزودن جعبه</Typography>
                    <PlusIcon className="mx-auto w-[105px] h-[105px] text-gray-700"/>
                    <Form
                        form={form}
                        onFinish={handleAddBox}
                        layout="vertical"
                        className="w-full"
                        disabled={labBoxAdd.isPending}
                    >
                        <Form.Item
                            label="جعبه"
                            name="box_UID"
                            required={false}
                            rules={[{required: true, message: errorMessage.required_choice}]}
                        >
                            <Select
                                options={boxAvailable.data}
                                loading={boxAvailable.isFetching}
                                fieldNames={boxAvailable.fieldName}
                                placeholder="انتخاب کنید"
                                size="large"
                                className="w-full"
                            />
                        </Form.Item>
                        <Button
                            size="large"
                            htmlType="submit"
                            type="primary"
                            className="w-full flex items-center justify-center"
                            icon={<PlusOutlined width={16} height={16}/>}
                        >
                            افزودن جعبه
                        </Button>
                    </Form>
                </div>
            </Spin>
        </Col>
    );
};

export default BoxCardAdd;
