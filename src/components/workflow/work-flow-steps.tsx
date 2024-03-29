import useGetAllHistory from '@/hooks/workflow-request/use-get-all-history'
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Descriptions, Divider, Tooltip, Typography } from 'antd'
import { Row } from 'antd/lib'
import React from 'react'


export default function WorkFlowSteps({ tasId: taskId }: { tasId: string }) {

    const { data: logs } = useGetAllHistory({ taskId: taskId })

    return (
        <Row gutter={[16, 16]} className='py-3'>
            {logs && <Col className='workflow-request-item flex justify-start flex-col relative' span={3}>
                <Divider className="workflow-request-divider workflow-request-divider-process" />
                <div className='flex'>
                    <Typography
                        className="workflow-request-icon text-xs"
                    >
                        شروع
                    </Typography>
                </div>
                <div>
                    <div className='text-right mt-3'>
                        <Typography className='font-semibold text-sm'>
                            شروع فرایند
                        </Typography>
                    </div>
                </div>
            </Col>}
            {logs?.map((log, index) => <Col
                className='workflow-request-item flex justify-start flex-col relative'
                span={3}
                key={index}
            >
                <Tooltip
                    title={<>
                        <Descriptions
                            style={{ minWidth: "300px" }}
                            title={<Typography className="text-sm">{log.Current_Step_Name}</Typography>}
                        >

                            <Descriptions.Item span={12} className="text-xs" label="نام فرایند">
                                {log.Process_name}
                            </Descriptions.Item>

                            <Descriptions.Item span={12} label="گزینه انتخاب شده">
                                {log.Label}
                            </Descriptions.Item>

                            <Descriptions.Item span={12} className="text-xs" label="توضیحات">
                                {log.Description_text}
                            </Descriptions.Item>

                            <Descriptions.Item span={12} className="text-xs" label="تاریخ شروع">
                                {log.Start_Time}
                            </Descriptions.Item>

                            <Descriptions.Item span={12} className="text-xs" label="تاریخ پایان">
                                {log.End_Time}
                            </Descriptions.Item>

                        </Descriptions>
                    </>}>
                    {{
                        0: <>
                            <Divider className="workflow-request-divider workflow-request-divider-process" />
                            <div className='flex'>
                                <Typography
                                    className="workflow-request-icon"
                                >
                                    {index + 1}
                                </Typography>
                            </div>
                        </>,
                        1: <>
                            <Divider className="workflow-request-divider workflow-request-divider-success" />
                            <div className='flex'>
                                <Typography
                                    className="workflow-request-success-icon-wrapper"
                                >
                                    <CheckOutlined className='workflow-request-Test-icon' />
                                </Typography>
                            </div>
                        </>,
                        2: <>
                            <Divider className="workflow-request-divider workflow-request-divider-process" />
                            <div className='flex'>
                                <Typography
                                    className="workflow-request-icon"
                                >
                                    <LoadingOutlined />
                                </Typography>
                            </div>
                        </>,
                        3: <>
                            <Divider className="workflow-request-divider workflow-request-divider-danger" />
                            <div className='flex'>
                                <Typography
                                    className="workflow-request-danger-icon-wrapper"
                                >
                                    <CloseOutlined className='workflow-request-Test-icon' />
                                </Typography>
                            </div>
                        </>
                    }[log.Status]}
                </Tooltip>
                <div>
                    <div className='text-right mt-3'>
                        <Typography className='font-semibold text-sm'>
                            {log.Current_Step_Name}
                        </Typography>
                        {/* <Typography className='mt-1'>
                            {log.Description_text}
                        </Typography> */}
                    </div>
                </div>

            </Col>)}
        </Row>
    )
}

