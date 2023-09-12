"use client";
import {Button, Checkbox, Divider, Form, Table, Typography} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";
import PrimaryProductForm from "./components/primary-product-form";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {mutationFetcher} from "../../../../../lib/server/mutationFetcher";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {getCookie} from "cookies-next";


export default function Page() {

    const [form] = Form.useForm();


    const {data: product, mutate, isLoading} = useSWR<{ records: [], count: number }>(
        "/RequestDetail/GetPageProduct",
        url => listFetcher(url, {
            arg: {
                requestMasterUid: getCookie("requestMasterUid"),
                fromRecord: 0,
                selectRecord: 100
            }
        })
    );

    const {isMutating: isDeleting, trigger} = useSWRMutation("/RequestDetail/DeleteProduct", mutationFetcher)

    const columns: ColumnsType<DataType> = [
        {
            title: "ردیف",
            dataIndex: "index",
            key: "1",
        },
        {
            title: "نام محصول",
            dataIndex: "ProductName",
            key: "2",
        },
        {
            title: "دانسیته",
            dataIndex: "density",
            key: "3",
        },

        {
            title: "جزئیات",
            key: "جزئیات",
            render: (_, record) => (
                <Button onClick={async () => {
                    //@ts-ignore
                    await trigger(record.Uid)

                    await mutate()
                }} danger type="text">
                    <Typography className="text-red-500"> حذف</Typography>
                </Button>
            ),
        },
    ];
    return (
        <>
            <Typography className="text-right font-medium text-base">
                لطفا اطلاعات خواسته شده را با دقت وارد نمایید.
            </Typography>
            <Divider/>
            <Typography className="mt-3 text-right font-medium text-base text-secondary-500 text-secondary mb-10">
                محصول تولیدی
            </Typography>
            <PrimaryProductForm mute={mutate}/>


            <Table
                loading={isLoading}
                pagination={false}
                className="mt-6"
                columns={columns}
                dataSource={product?.records || []}
            />
            <Divider/>
            <Form
                form={form}
                name="register"
            >
                <Form.Item
                    className=" mr-3 font-medium"
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('پذیرش شرایط و قوانین برای ثبت درخواست ضروری می باشد')),
                        },
                    ]}
                >
                    <Checkbox>
                        شرایط و <a href="https://google.com" target="_blank" className="text-primary-500">قوانین</a> را
                        خوانده و می پذیرم!
                    </Checkbox>
                </Form.Item>
                <Divider/>
                <div className="flex gap-6">
                    <Button
                        className="w-full management-info-form-submit btn-filter"
                        size="large"
                        type="primary"
                        htmlType="submit"
                    >
                        <span className="flex gap-3 justify-center ">ذخیره</span>
                    </Button>
                </div>
            </Form>
        </>
    );
}

interface DataType {
    key: string;
    name: string;
    row: number;
    nationalcode: number;
    productname: string;
    density: string;

    role: string;
}


const data: DataType[] = [
    {
        key: "1",
        row: 1,
        name: "مهدی نصیرلو",
        nationalcode: 1111111111,
        role: "مدیرعامل",
        productname: "هیدروکربن سبک",
        density: "بالا تر از 900gr/cm3",
    },
    {
        key: "2",
        row: 2,
        name: "امیر منصوری ",
        nationalcode: 2222222222,
        role: "مدیرعامل",
        productname: " هیدروکربن سنگین",
        density: "پایین تر از 900gr/cm3",
    },
];
// const MyFormItemContext = React.createContext<(string | number)[]>([]);

// interface MyFormItemGroupProps {
//   prefix: string | number | (string | number)[];
//   children: React.ReactNode;
// }

// function toArr(
//   str: string | number | (string | number)[]
// ): (string | number)[] {
//   return Array.isArray(str) ? str : [str];
// }

// const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatPath = React.useMemo(
//     () => [...prefixPath, ...toArr(prefix)],
//     [prefixPath, prefix]
//   );

//   return (
//     <MyFormItemContext.Provider value={concatPath}>
//       {children}
//     </MyFormItemContext.Provider>
//   );
// };

// const MyFormItem = ({ name, ...props }: FormItemProps) => {
//   const prefixPath = React.useContext(MyFormItemContext);
//   const concatName =
//     name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

//   return <Form.Item name={concatName} {...props} />;
// };
