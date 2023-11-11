import { ChevronDoubleRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button } from 'antd';
import React, { useContext } from 'react'
import StepContext from '../../../../stete-manager/step-context';

export default function DisplayButton({ setIsEditVisible }: { setIsEditVisible: any }) {

    const processController = useContext(StepContext);

    const showEdit = () => {
        // mutate()
        setIsEditVisible(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className='flex gap-3 justify-end'>
            <Button
                className="flex justify-center items-center gap-2"
                size="large"
                type="primary"
                htmlType="submit"
                icon={<PencilSquareIcon width={24} height={24} />}
                onClick={showEdit}
            >
                ویرایش
            </Button>
            <Button
                className="bg-gray-50 flex items-center justify-center"
                size="large"
                type="default"
                htmlType="submit"
                icon={<ChevronDoubleRightIcon width={24} height={24} />}
                onClick={() => processController.dispatch({ type: "PREVIOUS" })}
            >
                صفحه قبل
            </Button>
        </div>
    )
}