import React, {useState} from 'react';
import {Table, TableColumnsType} from "antd/lib";
import {z} from "zod";
import {formMakerApi} from "../../constance/form-maker";
import {Button} from "antd";
import {addIndexToData} from "@/utils/addIndexToData";
import useControlFormBuilder from "@/components/form-builder/hooks/use-controle-form-builder";
import ConfirmDeleteModal from "@/components/confirm-delete-modal";

interface PropType {
    schema: z.infer<typeof formMakerApi.Get.form>,
    formData: z.infer<typeof formMakerApi.Get.formData>,
    delete?: boolean,
    formKey: string
}

const FormDataTable = (props: PropType) => {

    const {deleteFromMany} = useControlFormBuilder(props.formData, props.formKey)

    const [open, setOpen] = useState()

    const [delOpen, setDelOpen] = useState<number | boolean>()

    // const formProvider = useControlFormBuilder()

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

    // && formProvider.deleteFromMany
    if (props?.delete) {

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
                dataSource={addIndexToData(props.formData)}
                pagination={false}
            />
            <ConfirmDeleteModal
                title='اطلاعات پایه'
                open={typeof delOpen === "number"}
                setOpen={setDelOpen}
                handleDelete={async () => {
                    if (typeof delOpen === "number") await deleteFromMany(delOpen as number, props.schema.Form_Key as string)
                }}
            />
            {/*<EditModal setOpen={setOpen} open={open} schema={props.schema}/>*/}
        </>
    );

};

export default FormDataTable;