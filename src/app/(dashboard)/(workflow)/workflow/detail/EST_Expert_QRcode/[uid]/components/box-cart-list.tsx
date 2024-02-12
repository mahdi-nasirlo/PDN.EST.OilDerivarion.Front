import React, {useState} from 'react';
import {Button, Col, Form, Popover, Row, Select, Typography} from "antd/lib";
import {motion} from "framer-motion";
import {Card} from "@/components/card";
import {PlusSmallIcon} from "@heroicons/react/24/outline";
import useUiWorkflowSampleAdd
    from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Expert_QRcode/[uid]/hook/use-ui-workflow-sample-add";
import useBoxSampleGetAvailableList from "@/hooks/request-package/use-box-sample-get-available-list";
import useBoxSampleAdd from "@/hooks/request-package/use-box-sample-add";
import {errorMessage} from "../../../../../../../../constance/error-message";

const BoxCartList = ({package_UID}: { package_UID: string }) => {

    const {boxList} = useUiWorkflowSampleAdd({package_UID})

    return boxList?.data?.map((item, index) => {

            console.log(item)

            return <Col key={index} xs={24} sm={12} xl={8} xxl={6}>
                <motion.div
                    key={index}
                    className="relative"
                    transition={{delay: index / 5}}
                    initial={{
                        scale: 0,
                        opacity: 0,
                        bottom: -25,
                        left: -10,
                    }}
                    animate={{
                        scale: 1,
                        opacity: 1,
                        bottom: 0,
                        left: 0
                    }}
                    exit={{
                        scale: 0,
                        transition: {duration: 1},
                        opacity: 0,
                        bottom: 25,
                    }}
                >
                    <Card
                        className='min-h-[708px] w-full border-2 bg-gray-50 p-4 rounded-2xl space-y-4'
                    >
                        <Typography
                            className="font-semibold text-lg"> جعبه {["اصلی", "شاهد 1", "شاهد 2"][item.box_usage_type - 1]} </Typography>
                        <div className="flex flex-col justify-between min-h-[600px]">
                            <Row gutter={[6, 12]}>
                                {item.samples?.map((item: any, index: number) => <Col
                                    key={index}
                                    sm={12}
                                    className="p-0 flex items-center justify-center"
                                >
                                    <Popover title="حذف آیتم" content={<>
                                        <Typography>از حذف ماده اولیه {item.name} مطمئن هستید؟</Typography>
                                        <div className="flex justify-end">
                                            <Button danger className="mt-3 border-red-500">حذف</Button>
                                        </div>
                                    </>}>
                                        <Button
                                            shape="circle"
                                            type="default"
                                            // style={{backgroundImage: "url(/static/hashor.svg"}}
                                            className="diagonal-lines hover:border-8 w-36 h-36 text-sm border-8 border-primary-500 flex flex-col items-center justify-center space-y-2.5"
                                            key={index}
                                        >
                                            {item.name}
                                        </Button>
                                    </Popover>
                                </Col>)}

                                {Array.from({length: (item?.capacity - (item.samples?.length ?? 0)) ?? 0}).map((value, index) => {

                                    return <Col
                                        key={index}
                                        sm={12}
                                        className="p-0 flex items-center justify-center"
                                    >
                                        {index == 0 ? <AddSample package_UID={package_UID} box_UID={item.box_UID}/> :
                                            <Button
                                                shape="circle"
                                                type="dashed"
                                                disabled
                                                className="w-36 h-36 opacity-60"
                                            >

                                            </Button>}
                                    </Col>
                                })}
                            </Row>
                        </div>
                    </Card>
                </motion.div>
            </Col>
        }
    )

};

const AddSample = ({package_UID, box_UID}: { package_UID: string, box_UID: string }) => {

    const available = useBoxSampleGetAvailableList({package_UID, box_UID})

    const addSample = useBoxSampleAdd({package_UID, box_UID})

    const [addPop, setAddPop] = useState<boolean>()

    return <Popover
        open={addPop}
        trigger="click"
        content={<Form
            disabled={addSample.isPending}
            onFinish={async (values) => {
                const res = await addSample.mutateAsync(values)
                if (res.success)
                    setAddPop(false)
            }}>
            <Form.Item
                name="sample_UID"
                required={false}
                rules={[{
                    required: true, message: errorMessage.required_choice
                }]}
                className="w-96"
                label="مواد اولیه"
                labelCol={{span: 24}}
            >
                <Select
                    className="w-full"
                    options={available.data}
                    fieldNames={available.fieldName}
                />
            </Form.Item>
            <div className="flex justify-end">
                <Button loading={addSample.isPending} htmlType="submit" type="primary" size="middle">
                    ثبت
                </Button>
            </div>
        </Form>} title="افزودن نمونه">
        <Button
            shape="circle"
            type="dashed"
            className="w-36 h-36 font-medium flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-primary-500"
        >
            <PlusSmallIcon className="w-5 h-5"/>
            افزودن مواد اولیه
        </Button>
    </Popover>
}
export default BoxCartList;