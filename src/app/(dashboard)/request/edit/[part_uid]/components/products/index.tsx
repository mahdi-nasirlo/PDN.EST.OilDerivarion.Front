import React, {useState} from 'react'
import DataTable from './data-table'
import CreateModal from './create-modal'

export default function Index({uid, package_uid}: { uid: string, package_uid?: string }) {


    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
            <DataTable
                setVisibleModal={setVisibleModal}
                uid={uid}
                package_uid={package_uid}
            />
            <CreateModal
                uid={uid}
                package_uid={package_uid}
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
            />
        </div>
    )
}
