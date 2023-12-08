"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import Avatar from "../Avatar";

const FollowBar = () => {
  const [allUsers, setAllUsersa] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://backlitter.onrender.com/users`
        );
        setAllUsersa(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [refreshCounter]);


  useEffect(() => {
    // Verificar si se creó una nueva cuenta
    const cuentaNueva = sessionStorage.getItem("newAccount");

    if (cuentaNueva === "true") {
      // Actualizar el estado para forzar la recarga del useEffect
      setRefreshCounter((prevCounter) => prevCounter + 1);

      // Resetear el valor de sessionStorage.cuentaNueva
      sessionStorage.removeItem("cuentaNueva");
    }
  }, []);



  if (allUsers.length === 0) {
    return null;
  }
  return (
    <div className=" px-6 py-4 hidden lg:block">
      <div className=" bg-neutral-800 rounded-xl p-4">
        <h2 className=" text-white text-xl font-semibold">Who to follow</h2>
        <div className=" flex flex-col gap-6 mt-4">
          {allUsers.map((user: any) => (
            <div key={user._id} className=" flex flex-row gap-4">
              <Avatar userId={user._id} profileImage={user.profileImage} />
              <div className=" flex flex-col">
                <p className=" text-white font-semibold text-sm">{user.name}</p>
                <p className=" text-neutral-400 text-sm">@{user.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FollowBar;
