import React, {useState} from 'react';
import {FormType} from "../FormBuilder";
import {TableColumnsType} from "antd/lib";
import {Button, Table} from "antd";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";

interface PropType {
    schema: FormType,
    records: { [formId: string]: any[] },
    delete?: boolean
}

const FormDataTable = (props: PropType) => {

    const [state, setState] = useState<any[]>([])

    // try {
    const formProvider = useControlFormBuilder()

    let columns: TableColumnsType<any>


    columns = props.schema.FormFields.map((value, index) => ({
        key: index,
        title: value.Title_Style,
        dataIndex: value.Name
    }))


    if (props?.delete && formProvider.deleteFromMany) {

        columns.push({
            title: "عملیات", render: (value, record, index) => <Button
                type="text"
                className="text-red-500"
                onClick={() => formProvider.deleteFromMany(index, props.schema.Form_Key)}
            >
                حذف
            </Button>
        })

    }


    return (
        <>
            {/*<Typography>{}</Typography>*/}
            <Table
                columns={columns}
                dataSource={props?.records as any || []}
                pagination={false}
            />
        </>
    );

};

export default FormDataTable;