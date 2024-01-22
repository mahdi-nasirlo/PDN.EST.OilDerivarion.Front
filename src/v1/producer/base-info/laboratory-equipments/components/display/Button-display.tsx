import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { Button } from 'antd'
import React from 'react'

export default function ButtonDisplay(
    { mutate, setIsEditVisible }:
        { mutate: () => void, setIsEditVisible: any }
) {

    const showEdit = () => {
        mutate()
        setIsEditVisible(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Button
            className="max-md:w-full flex justify-center items-center gap-2"
            size="large"
            type="primary"
            htmlType="submit"
            onClick={showEdit}
        >
            <PencilSquareIcon width={24} height={24} />
            <span className="flex">
                ویرایش
            </span>
        </Button>
    )
}
