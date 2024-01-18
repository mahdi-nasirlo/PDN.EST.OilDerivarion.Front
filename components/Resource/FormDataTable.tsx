import React, { useState } from 'react';
import { FormType } from "../FormBuilder";
import { TableColumnsType } from "antd/lib";
import { Button, Table } from "antd";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";
import { addIndexToData } from '../../lib/addIndexToData';
import EditModal from "./EditModal";
import ConfirmDeleteModal from '@/components/confirm-delete-modal';

interface PropType {
    schema: FormType,
    records: { [formId: string]: any[] },
    delete?: boolean
}

const FormDataTable = (props: PropType) => {

    const [open, setOpen] = useState()

    const [delOpen, setDelOpen] = useState<number | boolean>()

    const formProvider = useControlFormBuilder()

    let columns: TableColumnsType<any>

    columns = props.schema.FormFields.map((value, index) => ({
        key: index,
        title: value.Title_Style,
        dataIndex: value.Name
    }))

    columns.unshift(
        {
            title: "ردیف",
            dataIndex: "Row",
            key: 'Row',
            width: "5%",
        },
    )

    // @ts-ignore
    if (props?.delete && formProvider.deleteFromMany) {

        columns.push(
            {
                align: "center",
                fixed: "right",
                width: "10%",
                title: "عملیات",
                render: (value, record, index) => <>
                    <Button onClick={() => setOpen(record)} type="text" className="text-secondary-500 font-bold">
                        ویرایش
                    </Button>
                    <Button
                        type="text"
                        className="text-red-500 font-bold"
                        onClick={() => setDelOpen(index)}
                    >
                        حذف
                    </Button>
                </>
            }
        )

    }

    return (
        <>
            <Table
                columns={columns}
                dataSource={addIndexToData(props?.records as any || [])}
                pagination={false}
            />
            <ConfirmDeleteModal
                title='اطلاعات پایه'
                open={typeof delOpen === "number"}
                setOpen={setDelOpen}
                handleDelete={() => { if (typeof delOpen === "number") formProvider.deleteFromMany(delOpen as number, props.schema.Form_Key) }} />
            <EditModal setOpen={setOpen} open={open} schema={props.schema} />
        </>
    );

};

export default FormDataTable;