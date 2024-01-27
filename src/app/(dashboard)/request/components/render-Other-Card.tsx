import ConfirmDeleteModal from '@/components/confirm-delete-modal';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline'
import { Button, Col, Row, Tag, Typography } from 'antd'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function RenderOtherCard({ index, status }: any) {

    const router = useRouter();

    const HandelEditPackage = () => router.push('/request/uid');

    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <>
            <div className='flex flex-col justify-center space-y-4'>
                <div>{`پکیج شماره ${index + 1}`}</div>

                <ArchiveBoxArrowDownIcon className='mx-auto w-[105px] h-[105px]' />

                <div className="space-y-4 w-full">

                    <div className="flex justify-between">

                        <Typography>روش تولید:</Typography>

                        <Tag color='blue' className='ml-0 p-1 font-bold'>بلندینگ</Tag>

                    </div>

                    <div className="flex justify-between">

                        <Typography>وضعیت:</Typography>

                        {status
                            ? <Tag
                                className='ml-0 p-1'
                                icon={<CheckCircleOutlined />}
                                color="success"
                            >
                                تکمیل شده
                            </Tag>
                            : <Tag
                                className='ml-0 p-1'
                                icon={<CloseCircleOutlined />}
                                color="error"
                            >
                                تکمیل نشده
                            </Tag>
                        }

                    </div>
                </div>
                <Row gutter={[16, 12]}>
                    <Col xs={24} xl={12}>
                        <Button
                            size="large"
                            type="default"
                            className="w-full flex items-center justify-center"
                            danger
                            icon={<DeleteOutlined width={16} height={16} />}
                            onClick={() => setDeleteModal(true)}
                        >
                            حذف
                        </Button>
                    </Col>
                    <Col xs={24} xl={12}>
                        <Button
                            size="large"
                            type="default"
                            className="w-full flex items-center justify-center text-secondary-500 border-secondary-500"
                            icon={<EditOutlined width={16} height={16} />}
                            onClick={HandelEditPackage}
                        >
                            ویرایش
                        </Button>
                    </Col>
                </Row>
            </div >

            <ConfirmDeleteModal
                title='پکیج'
                open={deleteModal}
                setOpen={setDeleteModal}
                handleDelete={() => setDeleteModal(false)}
            />
        </>
    )
}
