"use client";

import useProfileModel from "@/hooks/zustandHooks/useProfileModal";
import { User } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

interface AvatarProps {
  userId?: string | undefined;
  isLarge?: boolean;
  hasborder?: boolean;
  profileImage?: string;
  flag?: boolean;
  Zoom?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasborder,
  profileImage,
  flag,
  Zoom,
}) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      if (userId) {
        const { data } = await axios.get(
          `https://backlitter.onrender.com/users/${userId}`
        );
        const user = data;
        setUser(user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (flag) {
      fetchUser();
    }
  }, [flag]);

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

  const { onOpen } = useProfileModel();
  const handleClick = (e: any) => {
    e.stopPropagation();
    onOpen(profileImage || "/images/placeholder.png");
  };
  return (
    <div
      className={`
  ${hasborder ? "border-4 border-black" : ""}
  ${isLarge ? "h-32" : "h-12"}
  ${isLarge ? "w-32" : "w-12"}
  rounded-full
  hover:opacity-90
  transition
  cursor-pointer
  relative
  `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={Zoom ? handleClick : onClick}
        src={profileImage || user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
