import React, {useEffect} from 'react';
import {Alert, Modal} from "antd";
import {useRouter} from "next/navigation";

interface dataProps {
    firstName: string,
    lastName: string,
    personNationalCode: string,
    producerStatusId: 1 | 2 | 3,
    producerStatusName: string,
    requestRejectionDescription: string,
    companyName: string,
    companyNationalCode: string,
    businessNumber: string,
    operationLicense: string,
    establishmentPermit: string,
    requestDescription: string,
    requestImage: string,
}

const StatusModal = ({data, open = false, setOpen}: { data: dataProps, open?: boolean, setOpen: any }) => {

    const router = useRouter()

    let message

    if (data?.producerStatusId === 1) {
        message = "پنل شما با موفقیت فعال شد در حال انتقال هستید ..."
    }

    if (data?.producerStatusId === 2) {
        message = <div>
            <span>
               رد شد {`"${data?.requestRejectionDescription}"`}درخواست شما توسط مسئول مربوطه به دلیل
            </span>
        </div>
    }

    if (data?.producerStatusId === 3) {
        message = "در حال برسی ...  لطفا منتظر بمانید"
    }

    useEffect(() => {

        if (data?.producerStatusId === 1)
            router.push("/producer")

    }, [data])


    const onClose = () => setOpen(false)
    return (
        <Modal footer={false} onCancel={onClose} open={open} title={` وضعیت درخواست شما: ${data?.producerStatusName}`}>
            <Alert message={message} type="warning"/>
        </Modal>
    );
};

export default StatusModal;