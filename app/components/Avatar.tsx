"use client";
import { useUser } from "@/hooks/useUser";
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
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasborder,
  profileImage,
  flag,
}) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    if (userId) {
      const { data } = await axios.get(
        `http://localhost:3000/api/users/${userId}`
      );
      const user = data;
      setUser(user);
    }
  };

  if (flag) {
    useEffect(() => {
      fetchUser(); // Llamar a "fetchUser" dentro de "useEffect" para que se ejecute después del montaje.
    }, [fetchUser]);
  }

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `http://localhost:3000/users/${userId}`;
      router.push(url);
    },
    [router, userId]
  );

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
        onClick={onClick}
        src={profileImage || user?.profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
