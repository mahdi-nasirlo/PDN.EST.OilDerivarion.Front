import Image from 'next/image'
import {SmileOutlined} from '@ant-design/icons'
import {Dropdown, MenuProps, Modal, theme, Typography} from 'antd'
import {useState} from "react";
import {useRouter} from "next/navigation";


export default function HeaderDropdown() {
    const {token} = theme.useToken()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter()

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        router.push('/dashboard?logout=true')
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined/>,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'خروج',
            onClick: () => {
                showModal()
            },
            theme: "dark"
        },
    ];

    return (
        <>
            <Dropdown className='flex flex-wrap items-center cursor: pointer' menu={{items}}>
                <span>
                  <Image className='ml-4' height={40} width={40} alt='person-circle icon'
                         src="/static/person-circle.svg"/>
                  <span>
                    <Typography style={{fontSize: "16px", fontWeight: 400, color: token.colorTextBase}}
                                className='text-lg hidden lg:block'>نام کاربری</Typography>
                    <Typography style={{fontSize: "12px", fontWeight: 400, color: token.colorTextDisabled,}}
                                className='font-semibold hidden lg:block'>سمت شغلی</Typography>
                  </span>
                  <Image className='mr-8 hidden lg:block' height={16} width={16} src={"/static/chevron-down.svg"}
                         alt='chevron-down.svg'/>
                </span>
            </Dropdown>

            <Modal okText='بله' cancelText='خیر' title="خروج از حساب کاربری" open={isModalOpen} onOk={handleOk}
                   onCancel={handleCancel}>
                از خروج خود اطمینان دارید؟
            </Modal>
        </>
    )
}


