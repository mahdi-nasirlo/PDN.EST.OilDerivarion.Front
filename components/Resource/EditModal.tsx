import React from 'react';
import { Modal } from "antd";
import FormBuilder, { FormType } from "../FormBuilder";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";

const EditModal = ({ open, setOpen, schema }: {
    open?: any,
    schema: FormType,
    setOpen: (arg: any) => void
}) => {

    const formProvider = useControlFormBuilder()

    return (
        <Modal
            width={800}
            onCancel={() => setOpen(undefined)}
            title="ویرایش اطلاعات"
            open={open !== undefined}
            footer={false}
        >
            <FormBuilder
                key={1}
                item={schema}
                initialValues={open}
                title={false}
                onSet={(data, formID) => {
                    formProvider.onUpdateMany(data, formID, open?.Row);
                    setOpen(undefined)
                }}
            />
        </Modal>
    );
};

export default EditModal;