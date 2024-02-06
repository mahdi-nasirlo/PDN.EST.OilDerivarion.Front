import React, {useState} from 'react'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal'

export default function Index({uid}: { uid: string }) {


    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
            <DataTable setVisibleModal={setVisibleModal} uid={uid}/>
            <CreateModal uid={uid} visibleModal={visibleModal} setVisibleModal={setVisibleModal}/>
        </div>
    )
}
