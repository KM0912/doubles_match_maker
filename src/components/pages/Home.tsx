import React from "react";
import { Space, Typography } from "antd";
import PairButton from "../molecules/PairButton";

const { Text } = Typography;

const Home = () => {
  return (
    <Space direction="horizontal">
      <PairButton pairs={["1", "2"]} />
      <Text>VS</Text>
      <div>
        <PairButton pairs={["3", "4"]} />
      </div>
    </Space>
  );
};

export default Home;
