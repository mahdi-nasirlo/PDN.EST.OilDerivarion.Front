import React, { useState } from 'react'
import DataTable from './components/data-table'
import CreateModal from './components/create-modal'

export default function Index() {

    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <div>
            <DataTable setVisibleModal={setVisibleModal} />
            <CreateModal visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
        </div>
    )
}
