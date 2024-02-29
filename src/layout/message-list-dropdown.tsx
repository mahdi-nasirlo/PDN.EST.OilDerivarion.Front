import React from 'react'
import Image from 'next/image'
import { Badge, Dropdown } from 'antd'
import useGetUserMessage from '@/hooks/message/useGetUserMessage';
import useUnReadMessageCount from '@/hooks/message/useUnReadMessageCount';
import { useGetUserInfo } from '@/hooks/sso/use-get-user-info';

export default function MessageListDropdown() {

    const userGetInfo = useGetUserInfo();

    const unReadMessageCount = useUnReadMessageCount(userGetInfo.data?.nationalCode)

    const userMessage = useGetUserMessage({
        userName: userGetInfo.data?.nationalCode as string,
        uid: "d5424eea-102a-434c-af94-67fdfb292be4",
        direction: false
    })


    return (
        <Badge count={unReadMessageCount.data}>
            <Dropdown
                trigger={['click']}
                placement="bottom"
                arrow={{ pointAtCenter: true }}
                className="pr-4 pl-8 cursor-pointer"
                menu={{
                    items: userMessage.data?.map((item, index) => ({
                        key: index,
                        label: `${item.Body}`
                    }))
                        ?? []
                }}
            >
                <Image
                    height={30}
                    width={30}
                    alt="chat-bubble-oval-left-ellipsis icon"
                    src="/static/chat-bubble-oval-left-ellipsis.svg"
                />
            </Dropdown>
        </Badge >
    )
}
