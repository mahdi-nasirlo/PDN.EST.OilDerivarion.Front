import { Button, Divider, Typography } from 'antd'
import React, { useContext } from 'react'
import StepContext from '../../stete-manager/step-context';
import StepContextActivate from '../../../stete-manager/step-context';
import Resource from "../../../../../../../components/Resource";
import { formsUid } from "../../../../../../../Constants/formsUid";

export default function Index() {

    const processController = useContext(StepContext);
    const processControllerActivate = useContext(StepContextActivate);

    return (
        <>
            <div className='flex justify-between'>
                <div className='flex items-center gap-3'>
                    <Typography className='font-bold'>اطلاعات خط تولید (1 از 7)</Typography>
                    <Typography className='text-secondary-500'>
                        اطلاعات مخازن مواد اولیه
                    </Typography>
                </div>
            </div>
            <Divider />
            <Resource categoryID={formsUid.mix_blending_tank_information} />
            <Divider />
            <div className='flex gap-3'>
                <Button
                    className="w-full bg-gray-100"
                    size="large"
                    type="dashed"
                    htmlType="submit"
                    onClick={() => processControllerActivate.dispatch({ type: "PREVIOUS" })}
                >
                    مرحله قبلی
                </Button>
                <Button
                    className="w-full management-info-form-submit btn-filter"
                    size="large"
                    type="primary"
                    htmlType="submit"
                    onClick={() => processController.dispatch({ type: "NEXT", stepNumber: 6 })}
                >
                    مرحله بعد
                </Button>
            </div>
        </>
    )
}
