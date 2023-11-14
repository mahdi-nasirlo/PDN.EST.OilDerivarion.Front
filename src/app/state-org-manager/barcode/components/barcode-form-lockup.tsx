import React from 'react';
import {FormInstance, Modal, Table, Typography} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";
import {ColumnsType} from "antd/es/table";
import {RequestMaster} from "../../../../../interfaces/requestDetail";
import {addIndexToData} from "../../../../../lib/addIndexToData";

function BarcodeFormLockup(props: {
    form: FormInstance,
    open: boolean,
    setOpen: (arg: boolean) => void,
    setUid: (arg: string) => void
}) {

    const {isLoading, data} = useSWR<{ records: RequestMaster[] }>(
        "/RequestMaster/GetPage",
        (url) => listFetcher(url, {
            arg: {
                "fromRecord": 0,
                "selectRecord": 10000,
                "stepKey": null
            }
        })
    )

    return (
        <Modal onOk={() => props.setOpen(false)} onCancel={() => props.setOpen(false)} open={props.open}
               title="انتخاب درخواست">
            <Typography className="mb-4 font-medium">
                درخواست خود را از لیست پایین انتخاب نمایید
            </Typography>
            <Table
                columns={columns}
                loading={isLoading}
                rowKey={"Uid"}
                dataSource={addIndexToData(data?.records)}
                pagination={{
                    pageSize: 5
                }}
                rowSelection={{
                    type: "radio",
                    onSelect: (value) => {
                        props.setOpen(false);
                        props.setUid(value.Uid)
                        props.form.setFieldValue("requestMasterUid", value.Uid)
                    }
                }}
            />
        </Modal>
    );
}

const columns: ColumnsType<RequestMaster> = [
    {
        title: "ردیف",
        dataIndex: "Row",
        key: "1"
    },
    {
        title: "نام شرکت",
        dataIndex: "CompanyName",
        key: "2"
    },
    {
        title: "روش تولید",
        dataIndex: "ProductionMethodName",
        key: "4"
    }
]

export default BarcodeFormLockup;