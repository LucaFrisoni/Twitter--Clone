"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import ReactChart from "../Statistics/ReactChart";
import debounce from "lodash.debounce";
interface ChartInfo {
  labels: string[];
  values: number[];
}

interface StadisticsViewProps {
  userId: string;
  refreshInterval?: number;
}

const StaticksView = ({ userId }: StadisticsViewProps) => {
  const user = useSelector((state: any) => state.user);

  const [totalLikes, setTotalLikes] = useState(0);
  const [likesToday, setLikesToday] = useState(0);
  const [likesYesterday, setLikesYesterdays] = useState(0);
  const [selectedMonth1, setSelectedMonth1] = useState(""); // Estado para el mes seleccionado
  const [selectedYear1, setSelectedYear1] = useState(""); // Estado para el año seleccionado
  const [selectedMonth2, setSelectedMonth2] = useState(""); // Estado para el mes seleccionado
  const [selectedYear2, setSelectedYear2] = useState(""); // Estado para el año seleccionado

  const [chartInfo, setChartInfo] = useState<ChartInfo>({
    labels: [],
    values: [],
  });
  const [chartInfo2, setChartInfo2] = useState<ChartInfo>({
    labels: [],
    values: [],
  });

  const [disabled1, setDisabled1] = useState(true);
  const [disabled2, setDisabled2] = useState(true);

  const [loading, isLoading] = useState(false);
  const [loading2, isLoading2] = useState(false);
  const [loading3, isLoading3] = useState(true);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);

  const fetchLikesData = useCallback(async () => {
    const { data } = await axios.get(
      `https://backlitter.onrender.com/chartsTL?userId=${userId}`
    );
    setTotalLikes(data.totalLikes);
    setLikesToday(data.likesToday);
    setLikesYesterdays(data.likesYesterday);
    isLoading3(false);
  }, [user]);

  useEffect(() => {
    fetchLikesData();
  }, [fetchLikesData]);

  // Calcular el porcentaje de cambio

  const percentageChange =
    ((likesToday - likesYesterday) / likesYesterday) * 100;

  let changeMessage = "";
  let messageColor = "";
  let sum = likesToday - likesYesterday;
  if (percentageChange > 0) {
    messageColor = "green";
    changeMessage = `Likes increase a ${percentageChange.toFixed(
      2
    )}% compared to the day before with ${sum} more likes!`;
  } else if (percentageChange < 0) {
    messageColor = "red";
    changeMessage = ` Likes decrease a ${Math.abs(percentageChange).toFixed(
      2
    )}% compared to the day before with ${-sum} less likes`;
  } else {
    changeMessage = "The number of likes is the same as the day before.";
    messageColor = "";
  }

  if (likesYesterday === 0) {
    changeMessage = "No likes from yesterday yet";
    messageColor = "";
  }
  if (totalLikes === 0) {
    changeMessage = "This account does not have likes yet";
    messageColor = "";
  }

  if (!user) {
    return (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  const handleMonthChange = (month: string) => {
    // Actualiza el estado con el año seleccionado
    setSelectedMonth1(month);
    if (selectedYear1) {
      setDisabled1(false);
    }
    // Realiza cualquier otra acción necesaria con el año seleccionado
  };
  const handleYearChange = (year: string) => {
    // Actualiza el estado con el año seleccionado
    setSelectedYear1(year);
    if (selectedMonth1) {
      setDisabled1(false);
    }
    // Realiza cualquier otra acción necesaria con el año seleccionado
  };
  const handleMonthChange2 = (month: string) => {
    // Actualiza el estado con el año seleccionado
    setSelectedMonth2(month);
    if (selectedYear1) {
      setDisabled2(false);
    }
    // Realiza cualquier otra acción necesaria con el año seleccionado
  };
  const handleYearChange2 = (year: string) => {
    // Actualiza el estado con el año seleccionado
    setSelectedYear2(year);
    if (selectedMonth2) {
      setDisabled2(false);
    }
    // Realiza cualquier otra acción necesaria con el año seleccionado
  };

  const handleCharts1 = async () => {
    try {
      isLoading(true);
      setFlag(true);
      const { data } = await axios.get(
        "https://backlitter.onrender.com/charts",
        {
          params: {
            userId: userId,
            month: selectedMonth1,
            year: selectedYear1,
            mode: "day",
          },
        }
      );

      setChartInfo(data);
    } catch (error: any) {
      if (
        error?.response.data ==
        "You cannot select a month that has not happened yet"
      ) {
        return toast.error(
          "You cannot select a month that has not happened yet"
        );
      }
      return toast.error("Something went wrong with charts information");
    } finally {
      isLoading(false);
    }
  };
  const handleCharts2 = async () => {
    try {
      isLoading2(true);
      setFlag2(true);
      const { data } = await axios.get(
        "https://backlitter.onrender.com/charts",
        {
          params: {
            userId: userId,
            month: selectedMonth2,
            year: selectedYear2,
            mode: "week",
          },
        }
      );
      setChartInfo2(data);
    } catch (error: any) {
      console.log(error);
      if (
        error?.response.data ==
        "You cannot select a month that has not happened yet"
      ) {
        return toast.error(
          "You cannot select a month that has not happened yet"
        );
      }
      return toast.error("Something went wrong with charts information");
    } finally {
      isLoading2(false);
    }
  };

  const DebouncehandleCharts1 = debounce(handleCharts1, 1000);
  const DebouncehandleCharts2 = debounce(handleCharts2, 1000);
  //
  return (
    <>
      {loading3 ? (
        <div className=" flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : (
        <div className="p-3 overflow-y-auto">
          <div className="flex flex-row gap-3 justify-center p-8">
            <div className="flex flex-col justify-center items-center bg-black w-40 h-40 rounded-md hover:bg-white/20 transition border-2 border-sky-500">
              <p className="text-white p-2 font-bold text-lg">Total Likes</p>
              <AiFillHeart color="red" size={40} />
              <p className="text-white font-bold">{totalLikes}</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-slate-100 w-40 h-40 rounded-md hover:bg-white/80 transition border-2 border-gray-300">
              <p className=" p-2 font-bold text-lg">Total Followers</p>
              <RiUserFollowFill className="text-sky-500" size={40} />
              <p className=" font-bold">{user?.followingIds.length}</p>
            </div>

            <div className="flex flex-col justify-center items-center bg-black w-40 h-40 rounded-md hover:bg-white/20 transition border-2 border-sky-500">
              <p className="text-white p-2 font-bold text-lg">Likes Today</p>
              <AiFillHeart color="red" size={40} />
              <p className="text-white font-bold">{likesToday}</p>
            </div>
          </div>

          <div className=" w-full text-white">
            <p className=" p-2 font-bold text-3xl">Porcentual Statistics</p>
            <hr className="border-gray-500" />
            <p
              className={` p-2 font-semibold text-gray-500 
         ${messageColor == "red" ? "text-red-800" : ""} 
         ${messageColor == "green" ? "text-green-600" : ""}
         `}
            >
              {changeMessage}
            </p>
          </div>
          <div>
            <ReactChart
              title="Daily likes"
              handleMonthChange={handleMonthChange}
              handleYearChange={handleYearChange}
              disabled={disabled1}
              handleCharts={DebouncehandleCharts1}
              flag={flag}
              loading={loading}
              chartInfo={chartInfo}
            />
            <ReactChart
              title="Weakly likes"
              handleMonthChange={handleMonthChange2}
              handleYearChange={handleYearChange2}
              disabled={disabled2}
              handleCharts={DebouncehandleCharts2}
              flag={flag2}
              loading={loading2}
              chartInfo={chartInfo2}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StaticksView;
