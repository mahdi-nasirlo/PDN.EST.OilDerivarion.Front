import React, {useState} from 'react'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal'

interface TProps {
    uid: string,
}

export default function Index({uid}: TProps) {

    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
            <DataTable partUid={uid} setVisibleModal={setVisibleModal}/>
            <CreateModal
                uid={uid}
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
            />
        </div>
    )
}
