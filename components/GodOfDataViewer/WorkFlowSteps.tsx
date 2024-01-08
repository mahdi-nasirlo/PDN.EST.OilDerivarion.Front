import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { Col, Descriptions, Divider, Tooltip, Typography } from 'antd'
import { Row } from 'antd/lib'
import React from 'react'
import { LogHistory } from '../../hooks/workFlowRequest/useGetAllHistory'

export default function WorkFlowSteps({ logs }: { logs: LogHistory[] }) {

    return (
        <Row gutter={[16, 16]}>
            <Col className='workflow-request-item flex justify-start flex-col relative' span={6}>
                <Divider className="workflow-request-divider workflow-request-divider-process" />
                <div className='flex'>
                    <Typography
                        className="workflow-request-icon"
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
            </Col>
            {logs?.map((log, indx) => <Col
                className='workflow-request-item flex justify-start flex-col relative'
                span={6}
                key={indx}
            >
                <Tooltip title={<>
                    <Descriptions>
                    </Descriptions>
                </>}>
                    {{
                        0: <>
                            <Divider className="workflow-request-divider workflow-request-divider-process" />
                            <div className='flex'>
                                <Typography
                                    className="workflow-request-icon"
                                >
                                    {indx + 1}
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
                        <Typography className='mt-1'>
                            {log.Description_text}
                        </Typography>
                    </div>
                </div>

            </Col>)}
        </Row>
    )
}

