"use client";

import React from "react";
import Image from "next/image";
import { Badge, Button, Empty, Popover, Spin, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import useGetMessageList from "@/hooks/message/useGetMessageList";
import useUnReadMessageCount from "@/hooks/message/useUnReadMessageCount";
import { useGetUserInfo } from "@/hooks/sso/use-get-user-info";
import { EnvelopeIcon, EnvelopeOpenIcon, ListBulletIcon } from "@heroicons/react/24/outline";

export default function MessageListDropdown() {

  const userGetInfo = useGetUserInfo();

  const unReadMessageCount = useUnReadMessageCount(
    userGetInfo.data?.nationalCode
  );

  const userMessage = useGetMessageList({
    userName: userGetInfo.data?.nationalCode as string,
    direction: true,
  });


  const CustomBody = (item: any) => item.Body.length > 40 ? item.Body.substring(0, 30) + "..." : item.Body

  const TabItems = [
    {
      key: "1",
      label: "تمام پیام ها",
      icon: <ListBulletIcon height={16} width={16} />,
      isLoading: userMessage.isLoading || userMessage.isFetching,
      children: userMessage.data?.map((item, index) => <Button
        key={index}
        type="text"
        className="flex items-center justify-between my-1 w-full"
      >
        {CustomBody(item)}
        {item.Is_Read ? <EnvelopeOpenIcon height={20} width={20} /> : <EnvelopeIcon height={20} width={20} />}
        {/* به جای Body ،Title یا Subject اضافه شود */}
        {/* {item.Write_Date} اضافه شود */}
      </Button>),
    },
    {
      key: "2",
      label: "خوانده نشده",
      icon: <EnvelopeIcon height={16} width={16} />,
      isLoading: userMessage.isLoading || userMessage.isFetching,
      children: userMessage.data?.filter(item => !item.Is_Read).map((item, index) => (
        <Button type="text" className="my-1 w-full flex" key={index}>{CustomBody(item)}</Button>
      )),
    },
    {
      key: "3",
      label: "خوانده شده",
      icon: <EnvelopeOpenIcon height={16} width={16} />,
      isLoading: userMessage.isLoading || userMessage.isFetching,
      children: userMessage.data?.filter(item => item.Is_Read).map((item, index) => (
        <Button type="text" className="my-1 w-full flex" key={index}>{CustomBody(item)}</Button>
      )),
    }
  ]

  return (
    <Popover
      trigger={"click"}
      title={<Typography className="mb-2 flex items-center justify-center text-base">لیست پیام های دریافتی</Typography>}
      content={
        <Tabs
          // tabPosition={"max-lg" ? "top" : "right"}
          size="small"
          type="card"
          className="message-box-tab-panel"
        >
          {TabItems.map((item) =>
            <TabPane
              key={item.key}
              tab={<span className="flex justify-center items-center text-sm gap-2">
                {item.icon}
                {item.label}
              </span>}
            >
              {item.children?.length
                ? <Spin spinning={item.isLoading}>{item.children}</Spin>
                : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </TabPane>
          )
          }
        </Tabs >
      }
    >
      <Badge count={unReadMessageCount.data}>
        <Image
          height={30}
          width={30}
          alt="chat-bubble-oval-left-ellipsis icon"
          src="/static/chat-bubble-oval-left-ellipsis.svg"
        />
      </Badge>
    </ Popover >
  );
}
