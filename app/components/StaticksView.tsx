"use client";
import React, { useMemo } from "react";
import { AiFillHeart } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { useSelector } from "react-redux";

import {
  startOfDay,
  startOfWeek,
  eachWeekOfInterval,
  eachDayOfInterval,
  getISOWeek,
} from "date-fns";
import { ClipLoader } from "react-spinners";
import LineChart from "./reactCharts/Line";

type LikesByDay = {
  [date: string]: number;
};
type LikesByWeek = {
  [date: string]: number;
};

const StaticksView = () => {
  const user = useSelector((state: any) => state.user);

  const totalLikes = useMemo(() => {
    return user?.posts.reduce(
      (sum: any, post: any) => sum + post.likeIds.length,
      0
    );
  }, [user]);

  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  const likesToday = user?.posts.reduce((totalLikes: any, post: any) => {
    totalLikes += post.likeIds.filter((like: any) => {
      const likeDate = new Date(like.timestamp);
      return likeDate.toDateString() === currentDate.toDateString();
    }).length;
    return totalLikes;
  }, 0);

  const likesYesterday = user?.posts.reduce((totalLikes: any, post: any) => {
    totalLikes += post.likeIds.filter((like: any) => {
      const likeDate = new Date(like.timestamp);
      return likeDate.toDateString() === yesterdayDate.toDateString();
    }).length;
    return totalLikes;
  }, 0);

  // Calcular el porcentaje de cambio

  const percentageChange =
    ((likesToday - likesYesterday) / likesYesterday) * 100;

  let changeMessage = "";
  let messageColor = "";
  if (percentageChange > 0) {
    messageColor = "green";
    changeMessage = `Likes increase a ${percentageChange.toFixed(
      2
    )}% compared to the day before`;
  }
  if (percentageChange < 0) {
    messageColor = "red";
    changeMessage = ` Likes decrease a ${Math.abs(percentageChange).toFixed(
      2
    )}% compared to the day before`;
  } else {
    changeMessage = "The number of likes is the same as the day before.";
    messageColor = "";
  }

  if (likesYesterday === 0) {
    changeMessage = "No likes from yesterday yet";
    messageColor = "";
  }

  const likesPerDay = (user: any) => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    const lastDayOfMonth = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );

    const daysOfMonth = eachDayOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });

    // Creamos un objeto para almacenar los likes por fecha
    const likesByDay: LikesByDay = {};

    // Inicializamos el objeto con cero likes para cada día del mes
    daysOfMonth.forEach((day) => {
      likesByDay[day.toDateString()] = 0;
    });

    // Recorremos los posts para contar los likes por día
    user?.posts.forEach((post: any) => {
      post.likeIds.forEach((like: any) => {
        const likeDate = new Date(like.timestamp);
        const dayDateString = likeDate.toDateString();
        if (dayDateString in likesByDay) {
          likesByDay[dayDateString] += 1; // Incrementamos los likes por día
        }
      });
    });

    return {
      labels: daysOfMonth.map((day) => day.getDate()),
      values: Object.values(likesByDay), // Array con la cantidad de likes por día
    };
  };

  // Procesamiento de likes por semana
  const likesPerWeek = (user: any) => {
    const currentDate = new Date();
    const firstDayOfMonth = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    );
    const lastDayOfMonth = startOfDay(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
    );

    const weeksOfMonth = eachWeekOfInterval({
      start: firstDayOfMonth,
      end: lastDayOfMonth,
    });

    // Creamos un objeto para almacenar los likes por semana
    const likesByWeek: LikesByWeek = {};

    // Inicializamos el objeto con cero likes para cada semana del mes
    weeksOfMonth.forEach((weekStart) => {
      likesByWeek[getISOWeek(weekStart)] = 0;
    });

    // Recorremos los posts para contar los likes por semana
    user?.posts.forEach((post: any) => {
      post.likeIds.forEach((like: any) => {
        const likeDate = new Date(like.timestamp);
        const weekStart = startOfWeek(likeDate);
        const isoWeek = getISOWeek(weekStart);

        if (isoWeek in likesByWeek) {
          likesByWeek[isoWeek] += 1; // Incrementamos los likes por semana
        }
      });
    });

    return {
      labels: Object.keys(likesByWeek).map(Number),
      values: Object.values(likesByWeek), // Array con la cantidad de likes por semana
    };
  };

  if (!user) {
    return (
      <div className=" flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
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
        <p className=" p-2 font-bold text-3xl">Porcentual Stadistics</p>
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
        <h3 className=" text-white">Daily likes of the Month</h3>
        <div className="w-[240px] bg-light mx-auto px-2 border-2 border-sky-500 sm:w-[450px] sm:h-[225px] mt-3 mb-6">
          <LineChart xTitle="Days" data={likesPerDay(user)} />
        </div>
        <h3 className=" text-white">Weakly likes of the Month</h3>
        <div className=" w-[240px] bg-light mx-auto px-2 border-2 border-sky-500 sm:w-[450px] sm:h-[225px] mt-3">
          <LineChart xTitle="Weeks" data={likesPerWeek(user)} />
        </div>
      </div>
    </div>
  );
};

export default StaticksView;
