import { Alert, Button, Col, Divider, Form, Input, Row, Spin, Typography } from "antd";
import React from "react";
// import staticMessages from "../../../../../../../lib/staticMessages";
import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import useUiRequestProductDescriptionForm
    from "@/app/(dashboard)/request/[uid]/products/hook/use-ui-request-product-description-form";
import FileUpload from "@/components/file-upload/FileUpload";
import staticMessages from "@/lib/staticMessages";
import { useRouter } from "next/navigation";

const DescriptionForm = ({ uid }: { uid: string }) => {

    const {
        form,
        rule,
        updateDesc,
        requestInfo,
        onFinish
    } = useUiRequestProductDescriptionForm(uid)

    const router = useRouter()

    return <>
        <Alert
            className="border-none w-full text-right text-base font-normal text-red-500 mb-6"
            message={staticMessages.formAlert}
            type="error"
        />
        <Typography className="text-right font-medium text-base">
            لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
        </Typography>
        <Divider />
        <Spin spinning={requestInfo.isFetching}>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={24}>
                        <Form.Item
                            rules={[rule]}
                            name="process_description"
                            required={false}
                            label="شرح فرآیند تولید"
                        >
                            <Input.TextArea
                                style={{ minHeight: 80, resize: "none" }}
                                placeholder="وارد کنید"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 12]} className="flex justify-end mb-6">
                    <Col xs={12}>
                        <Button
                            className="w-full bg-gray-50"
                            size="large"
                            type="default"
                            onClick={() => router.push("/request")}
                        >
                            بازگشت به لیست پکیج ها
                        </Button>
                    </Col>
                    <Col xs={12}>
                        <Button
                            className="flex items-center justify-center w-full"
                            type="primary"
                            size="large"
                            htmlType="submit"
                            loading={updateDesc.isPending}
                            disabled={updateDesc.isPending || requestInfo.isFetching}
                            icon={<DocumentPlusIcon className="w-6" />}
                        >
                            ثبت شرح فرایند
                        </Button>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            rules={[rule]}
                            name="schematic_file_UID"
                            label="نمودار شماتیک فرآیند"
                            tooltip={<Typography>فایل باید به صورت pdf باشد</Typography>}
                        >
                            <div className="p-0 m-0 w-full">
                                <FileUpload />
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Spin>
    </>
}

export { DescriptionForm }