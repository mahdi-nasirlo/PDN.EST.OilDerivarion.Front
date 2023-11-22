import { Button } from 'antd';
import React from 'react'

export default function EditButton(
    { setIsEditVisible, form }:
        { setIsEditVisible: any, form: any }
) {
    const notDisplayForm = () => {
        // mutate()
        setIsEditVisible(true);
    };


    return (
        <div className='flex gap-3'>
            <Button
                className="w-full bg-gray-100 text-warmGray-500"
                size="large"
                htmlType="submit"
                onClick={notDisplayForm}
            // loading={isMutating}
            >
                انصراف
            </Button>
            <Button
                className="max-md:w-full"
                size="large"
                type="primary"
                htmlType="submit"
                onClick={() => form.submit()}
            // loading={isMutating}
            >
                ثبت
            </Button>
        </div>
    )
}