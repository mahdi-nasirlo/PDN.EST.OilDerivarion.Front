import React, {useState} from 'react'
import DataTable from './data-table'
import CreateModal from './create-modal'

interface TProps {
    uid: string,
    package_uid?: string
}

export default function Index({uid, package_uid}: TProps) {

    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
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
