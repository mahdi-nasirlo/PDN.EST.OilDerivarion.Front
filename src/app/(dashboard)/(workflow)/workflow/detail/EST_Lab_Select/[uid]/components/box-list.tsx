import useUiEstLabSelect
    from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/hook/use-ui-est-lab-select";
import {Col, Divider, Form, Row, Select} from "antd/lib";
import React from "react";
import BoxCardAdd from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/components/box-card-add";
import BoxCartList from "@/app/(dashboard)/(workflow)/workflow/detail/EST_Lab_Select/[uid]/components/box-cart-list";

const BoxList = ({package_UID}: { package_UID: string }) => {

    const {boxAvailable, labList, setLab_UID, lab_UID} = useUiEstLabSelect({package_UID})

    return <>
        <Row>
            <Col sm={12}>
                <Form.Item labelCol={{span: 24}} label="انتخاب آزمایشگاه">
                    <Select
                        value={lab_UID}
                        onChange={(e) => setLab_UID(e)}
                        fieldNames={labList.fieldName}
                        options={labList.data}
                    />
                </Form.Item>
            </Col>
        </Row>
        <Divider/>
        <Row gutter={[16, 12]} className="mb-5">
            <BoxCardAdd package_uid={package_UID}/>
            <BoxCartList package_UID={package_UID}/>
        </Row>
    </>
}

export {BoxList}