import React from 'react';
import {Modal} from "antd";
import FormBuilder, {FormType} from "../FormBuilder";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";

const EditModal = ({record, setRecord, schema}: {
    record?: any,
    schema: FormType,
    setRecord: (arg: any) => void
}) => {

    const formProvider = useControlFormBuilder()

    return (
        <Modal
            width={800}
            onCancel={() => setRecord(undefined)}
            title="ویرایش اطلاعات"
            open={record !== undefined}
            footer={false}
        >
            <FormBuilder
                key={1}
                item={schema}
                initialValues={record}
                title={false}
                onSet={(data, formID) => {
                    formProvider.onUpdateMany(data, formID, record?.Row);
                    setRecord(undefined)
                }}
            />
        </Modal>
    );
};

export default EditModal;