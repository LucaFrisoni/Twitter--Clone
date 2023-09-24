import React from "react";
import { Select } from "antd";

const { Option } = Select;

interface SelectYearProps {
  onChange: (year: string) => void;
}

const SelectYear: React.FC<SelectYearProps> = ({ onChange }) => {
  const handleYearChange = (year: string) => {
    onChange(year);
  };
  return (
    <Select
      placeholder="Select a year"
      style={{ width: 100, margin: 10 }}
      dropdownStyle={{ zIndex: 9999 }}
      onChange={handleYearChange}
      // Ajusta el z-index si es necesario
    >
      <Option value="2022">2022</Option>
      <Option value="2023">2023</Option>
    </Select>
  );
};

export default SelectYear;
