import SelectMonths from "@/libs/Antd/Select";
import SelectYear from "@/libs/Antd/SelectYear";
import LineChart from "@/libs/reactCharts/Line";
import { Button } from "antd";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

interface ReactChartProps {
  title: string;
  handleMonthChange: any;
  handleYearChange: any;
  disabled: any;
  handleCharts: any;
  flag: boolean;
  loading: boolean;
  chartInfo: any;
}

const ReactChart: React.FC<ReactChartProps> = ({
  title,
  handleMonthChange,
  handleYearChange,
  disabled,
  handleCharts,
  flag,
  loading,
  chartInfo,
}) => {
  return (
    <div className=" bg-neutral-800 p-2 rounded-2xl my-6 border border-neutral-700">
      <h2 className=" text-white  p-3 text-center font-black">{title}</h2>

      <SelectMonths onChange={handleMonthChange} />
      <SelectYear onChange={handleYearChange} />

      <Button
        type="primary"
        className="bg-white text-black relative top-[2px]"
        disabled={disabled}
        onClick={handleCharts}
      >
        <AiOutlineSearch />
      </Button>

      <div className="w-[240px] bg-light mx-auto px-2 border-2 border-sky-500 sm:w-[450px] sm:h-[225px] mt-3 mb-6 flex justify-center items-center">
        {flag ? (
          loading ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader color="lightblue" size={80} />
            </div>
          ) : (
            <LineChart
              xTitle="Days"
              label={chartInfo?.labels}
              values={chartInfo?.values}
            />
          )
        ) : (
          <p className="text-white text-center">
            Select a date to see the statistics
          </p>
        )}
      </div>
    </div>
  );
};

export default ReactChart;
