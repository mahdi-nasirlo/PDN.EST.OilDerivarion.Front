import React from 'react';
import {Modal} from "antd";
import useSWR from "swr";
import {listFetcher} from "../../../../../lib/server/listFetcher";

function BarcodeFormLockup(props: { open: boolean, setOpen: (arg: boolean) => void }) {

    const {isLoading, data} = useSWR(
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
            {/*<Table*/}
            {/*    loading={isLoading}*/}
            {/*    dataSource={data.recordes}*/}
            {/*/>*/}
        </Modal>
    );
}

export default BarcodeFormLockup;