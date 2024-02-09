import React, { useEffect, useState } from "react";
import { Avatar, Divider, List, Select, Skeleton } from "antd";
import { Col, Row } from "antd/lib";

interface DataType {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

const DataList = () => {
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <Select
            className="w-full"
            showSearch
            size="large"
            placeholder="انتخاب کنید"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={24}>
          <List
            // dataSource={data}
            renderItem={(item) => (
              <List.Item
              //   key={item.email}
              >
                <List.Item
                //   avatar={<Avatar src={item.picture.large} />}
                //   title={<a href="https://ant.design">{item.name.last}</a>}
                //   description={item.email}
                />
                <div>Content</div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

export default DataList;
