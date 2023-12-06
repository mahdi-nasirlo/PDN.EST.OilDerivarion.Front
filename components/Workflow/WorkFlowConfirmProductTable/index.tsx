import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Popconfirm, Select, Table, Tooltip, Typography} from 'antd';
import useGetAllProductRequestDetail from "../../../hooks/requestDetail/useGetAllProductRequestDetail";
import {addIndexToData} from "../../../lib/addIndexToData";
import useGetExpertOpinionTypeGetAll from "../../../hooks/baseInfo/useGetExpertOpinionTypeGetAll";

interface Item {
    Uid: string,
    ProductId: number,
    ProductUid: string,
    ProductName: string
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
        case "description":
            inputNode = <Input.TextArea rows={2}/>
            break;
        case "ExpertOpinionTypeTitle":
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
                            message: `Please Input ${title}!`,
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

const Index = ({uid, trigger}: { uid: string, trigger: (arg: any) => any }) => {

    const allProduct = useGetAllProductRequestDetail(uid)

    const [form] = Form.useForm();
    const [data, setData] = useState<any>(allProduct.data);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        setData(allProduct.data)
    }, [allProduct.data])

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

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });


                const res = await trigger({
                    uid: item.Uid,
                    expertOpinionTypeId: row.ExpertOpinionTypeTitle.value,
                    description: row.description
                })

                if (res) {
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
            dataIndex: 'description',
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
            dataIndex: 'ExpertOpinionTypeTitle',
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
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button size="small" type="text">انصراف</Button>
            </Popconfirm>
            <Button size="small" type="primary"
                    onClick={() => save(record.Uid)}
                    style={{marginRight: 8}}>
              ذخیره
            </Button>
          </span>
                ) : (
                    <Button type="text" disabled={editingKey !== ''} onClick={() => edit(record)}>
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
                bordered
                dataSource={addIndexToData(data as any)}
                columns={mergedColumns}
                loading={allProduct.isLoading}
            />
        </Form>
    );
};

export default Index;
