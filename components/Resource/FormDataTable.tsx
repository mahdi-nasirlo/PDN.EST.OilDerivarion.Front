import React, {useState} from 'react';
import {FormType} from "../FormBuilder";
import {TableColumnsType} from "antd/lib";
import {Button, Table} from "antd";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";

interface PropType {
    schema: FormType,
    records: { [formId: string]: any[] },
}

const FormDataTable = (props: PropType) => {

    const formProvider = useControlFormBuilder()

    let columns: TableColumnsType<any>

    columns = props.schema.FormFields.map((value, index) => ({
        key: index,
        title: value.Title_Style,
        dataIndex: value.Name
    }))

    columns.push({
        title: "عملیات", render: (value, record, index) => <Button
            type="text"
            className="text-red-500"
            onClick={() => formProvider.deleteFromMany(index, props.schema.Form_Key)}
        >
            حذف
        </Button>
    })

    let dataSource: any[] = []

    if (props.records[props.schema.Form_Key]) {
        dataSource = props?.records[props?.schema?.Form_Key]
    }

    const [state, setState] = useState<any[]>(dataSource)


    return (
        <>
            <Table
                columns={columns}
                dataSource={state}
            />
        </>
    );
};

export default FormDataTable;