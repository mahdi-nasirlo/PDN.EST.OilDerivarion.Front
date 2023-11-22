import React, {useEffect, useState} from 'react';
import {FormType} from "../FormBuilder";
import {TableColumnsType} from "antd/lib";
import {Button, Table} from "antd";
import useControlFormBuilder from "../FormBuilder/hooks/useControleFormBuilder";

interface PropType {
    schema: FormType,
    records: { [formId: string]: any[] },
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

    columns.push({
        title: "عملیات", render: (value, record, index) => <Button
            type="text"
            className="text-red-500"
            onClick={() => formProvider.deleteFromMany(index, props.schema.Form_Key)}
        >
            حذف
        </Button>
    })

    useEffect(() => {

        const records = props?.records
        const formKey = props?.schema?.Form_Key

        if (formKey && records && formKey in records && Array.isArray(records[formKey])) {
            setState(records[formKey])
        }
    }, [])


    return (
        <>
            <Table
                columns={columns}
                dataSource={state}
            />
        </>
    );
    // } catch (e) {
    //
    //     return <Typography>
    //         error in data table form
    //     </Typography>
    //
    // }
};

export default FormDataTable;