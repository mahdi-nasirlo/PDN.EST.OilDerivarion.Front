"use client";
import React, { useEffect, useState } from "react";
import { Button, Transfer } from "antd";
import type { TransferProps } from "antd";

interface RecordType {
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}

const TransferList = () => {
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);

  // const getMock = () => {
  //   const tempTargetKeys = [];
  //   const tempMockData = [];
  //   for (let i = 0; i < 20; i++) {
  //     const data = {
  //       key: i.toString(),
  //       title: `content${i + 1}`,
  //       description: `description of content${i + 1}`,
  //       chosen: i % 2 === 0,
  //     };
  //     if (data.chosen) {
  //       tempTargetKeys.push(data.key);
  //     }
  //     tempMockData.push(data);
  //   }
  //   setMockData(tempMockData);
  //   setTargetKeys(tempTargetKeys);
  // };

  // useEffect(() => {
  //   getMock();
  // }, []);

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };
  //@ts-ignore

  return (
    <Transfer
      titles={["گزارشات انتخاب نشده", "گزارشات انتخاب شده"]}
      dataSource={mockData}
      showSearch
      listStyle={{
        width: 300,
        height: 400,
      }}
      operations={["به راست", "به چپ "]}
      targetKeys={targetKeys}
      onChange={handleChange}
      render={(item) => `${item.title}-${item.description}`}
    />
  );
};

export default TransferList;
