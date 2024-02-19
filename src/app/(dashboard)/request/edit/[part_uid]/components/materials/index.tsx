import React, {useState} from 'react'
import DataTable from './data-table'
import CreateModal from './create-modal'
import {Alert} from "antd";

interface TProps {
    uid: string,
    package_uid?: string
}

export default function Index({uid, package_uid}: TProps) {

    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
            <Alert
                className={"w-full text-red-500 text-right font-bold py-3 mb-5"}
                message={"برای وارد کردن درصد مواد اولیه تمامی اعداد را به صورت درصد وزنی وارد نمایید."}
                type={"error"}
            />
            <DataTable package_uid={package_uid} partUid={uid} setVisibleModal={setVisibleModal}/>
            <CreateModal
                partUid={uid}
                package_uid={package_uid}
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
            />
        </div>
    )
}
