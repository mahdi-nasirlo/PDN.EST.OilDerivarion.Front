"use client"

import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Popconfirm, Select, Table, Tooltip, Typography} from 'antd';
import useGetExpertOpinionTypeGetAll from "../../../hooks/baseInfo/useGetExpertOpinionTypeGetAll";
import {addIndexToData} from "../../../lib/addIndexToData";

interface Item {
    Uid: string,
    ProductId: number,
    ProductUid: string,
    ProductName: string,
    ExpertOpinionTypeId: number | null,
    ExpertOpinionTypeName: string | null,
    Description: string | null,
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {


    let inputNode

    const expertOpinionType = useGetExpertOpinionTypeGetAll()

    switch (dataIndex) {
        case "Description":
            inputNode = <Input.TextArea rows={2}/>
            break;
        case "ExpertOpinionTypeName":
            inputNode = <Select
                labelInValue
                fieldNames={{label: "Name", value: "Id"}}
                loading={expertOpinionType.isLoading}
                options={expertOpinionType.data}
            />
            break;
    }

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{margin: 0}}
                    rules={[
                        {
                            required: true,
                            message: "لطفا مقدار را وارد کنید"
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Index = ({trigger, dataSource, isLoading}: {
    uid: string,
    trigger: (arg: any) => any,
    dataSource: any,
    isLoading: boolean
}) => {


    const [form] = Form.useForm();
    const [data, setData] = useState<any>(dataSource || []);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(dataSource)
    }, [dataSource])

    const isEditing = (record: Item) => record.Uid === editingKey;

    const edit = (record: Partial<Item>) => {
        form.setFieldsValue({name: '', age: '', address: '', ...record});
        setEditingKey(record.Uid as string);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields());

            const newData = [...data as any];

            const index = newData.findIndex((item) => key === item.Uid);

            console.log(index)

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });

                const res = await trigger({
                    uid: newData[index].Uid,
                    expertOpinionTypeId: row.ExpertOpinionTypeName.value || newData[index].ExpertOpinionTypeId,
                    description: row.Description
                })

                if (res) {

                    newData[index].ExpertOpinionTypeId = newData[index]?.ExpertOpinionTypeName?.value
                    newData[index].ExpertOpinionTypeName = newData[index].ExpertOpinionTypeName.label

                    setData(newData);
                    setEditingKey('');
                }

            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: "ردیف",
            dataIndex: "Row",
            width: "10%",
            editable: false
        },
        {
            title: 'نام محصول',
            dataIndex: 'ProductName',
            width: '25%',
            editable: false,
        },
        {
            title: 'توضیحات',
            dataIndex: 'Description',
            width: '15%',
            editable: true,
            render: (_: string, record: any) => <>
                <Tooltip
                    placement="top"
                    title={<Typography>{record.Description}</Typography>}
                >
                    <Typography.Text
                        className="w-[100px]"
                        ellipsis={true}
                        style={{width: "40px !important"}}
                    >
                        {record.Description}
                    </Typography.Text>
                </Tooltip>
            </>
        },
        {
            title: 'وضعیت',
            dataIndex: 'ExpertOpinionTypeName',
            width: '40%',
            editable: true,
        },
        {
            title: 'ثبت نظر',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Popconfirm title="مطمئن هستید؟" onConfirm={cancel}>
                          <Button size="small" type="text">انصراف</Button>
                        </Popconfirm>
                        <Button size="small" type="primary"
                                onClick={() => save(record.Uid)}
                                style={{marginRight: 8}}>
                          ذخیره
                        </Button>
                    </span>
                ) : (
                    <Button type="text" className="text-secondary-500" disabled={editingKey !== ''}
                            onClick={() => edit(record)}>
                        ویرایش
                    </Button>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                dataSource={addIndexToData(data || [] as any)}
                columns={mergedColumns}
                loading={isLoading}
            />
        </Form>
    );
};

export default Index;
