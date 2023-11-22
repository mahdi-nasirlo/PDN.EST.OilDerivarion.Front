import { Button, Col, Row } from 'antd'
import React from 'react'

export default function ButtonFilter({
    unsetFilter,
    isLoading
}: {
    unsetFilter: any,
    isLoading: boolean
}) {
    return (
        <Row dir="ltr">
            <Col xs={10} md={3} lg={2}>
                <div className="flex gap-4">
                    <Button
                        loading={isLoading}
                        onClick={unsetFilter}
                        className="btn-delete-filter"
                        size="large"
                        type="primary"
                        htmlType="reset"
                    >
                        حذف فیلتر
                    </Button>
                    <Button
                        loading={isLoading}
                        className="btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        اعمال فیلتر
                    </Button>
                </div>
            </Col>
        </Row>
    )
}
