import React from "react";
import { Space, Button, Typography } from "antd";

const { Text } = Typography;

interface CounterProps {
  label: string;
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({
  label,
  count,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <Space direction="horizontal">
      <Text>{label}：</Text>
      <Button danger onClick={handleDecrement}>
        -
      </Button>
      <Text>{count}</Text>
      <Button type="primary" onClick={handleIncrement}>
        +
      </Button>
    </Space>
  );
};

export default Counter;
