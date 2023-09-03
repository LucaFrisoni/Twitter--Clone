import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface SelectYearProps {
  onChange: (month: string) => void;
}

const SelectMonths: React.FC<SelectYearProps> = ({ onChange }) => {
  const handleMonthChange = (month: string) => {
    onChange(month);
  };
  return (
    <Select
      placeholder="Select a month…"
      style={{ width: 200 }}
      dropdownStyle={{ zIndex: 9999 }}
      onChange={handleMonthChange}
    >
      <Option value="January">January</Option>
      <Option value="February">February</Option>
      <Option value="March">March</Option>
      <Option value="April">April</Option>
      <Option value="May">May</Option>
      <Option value="June">June</Option>
      <Option value="July">July</Option>
      <Option value="August">August</Option>
      <Option value="September">September</Option>
      <Option value="October">October</Option>
      <Option value="November">November</Option>
      <Option value="December">December</Option>
    </Select>
  );
};

export default SelectMonths;
