import useGetUserMessage from '@/hooks/message/useGetUserMessage';
import useUnReadMessageCount from '@/hooks/message/useUnReadMessageCount';
import { useGetUserInfo } from '@/hooks/sso/use-get-user-info';
import { SmileOutlined } from '@ant-design/icons';
import { Badge, Dropdown } from 'antd'
import { MenuProps } from 'antd/lib';
import Image from 'next/image'
import React from 'react'

export default function MessageListDropdown() {

    const userGetInfo = useGetUserInfo();

    const unReadMessageCount = useUnReadMessageCount(userGetInfo.data?.nationalCode)

    const userMessage = useGetUserMessage({
        userName: userGetInfo.data?.nationalCode as string,
        uid: "d5424eea-102a-434c-af94-67fdfb292be4",
        direction: false
    })

    return (
        <Badge
            className="mr-4 ml-8"
            count={unReadMessageCount.data}
        >
            <Dropdown
                className="pr-4 pl-8"
                menu={{ items: userMessage.data?.map((item, index) => ({ key: index, label: `${item.Body}` })) ?? [] }}
            >
                <Image
                    height={24}
                    width={24}
                    alt="chat-bubble-oval-left-ellipsis icon"
                    src="/static/chat-bubble-oval-left-ellipsis.svg"
                />
            </Dropdown>
        </Badge>
    )
}
