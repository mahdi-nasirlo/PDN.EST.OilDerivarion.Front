import React, {useState} from 'react';
import {FormType} from "../FormBuilder";
import {TableColumnsType} from "antd/lib";
import {Button, Table} from "antd";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";
import {addIndexToData} from '../../lib/addIndexToData';
import EditModal from "./EditModal";

interface PropType {
    schema: FormType,
    records: { [formId: string]: any[] },
    delete?: boolean
}

const FormDataTable = (props: PropType) => {

    const [open, setOpen] = useState()

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
                        onClick={() => formProvider.deleteFromMany(index, props.schema.Form_Key)}
                    >
                        حذف
                    </Button>
                </>
            }
        )

    }

    console.log(props)


    return (
        <>
            <Table
                columns={columns}
                dataSource={addIndexToData(props?.records as any || [])}
                pagination={false}
            />
            <EditModal setRecord={setOpen} record={open} schema={props.schema}/>
        </>
    );

};

export default FormDataTable;