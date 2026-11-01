"use client";

import useProfileModel from "@/hooks/zustandHooks/useProfileModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface AvatarProps {
  userId?: string | undefined;
  isLarge?: boolean;
  hasborder?: boolean;
  profileImage?: string;
  Zoom?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  userId,
  isLarge,
  hasborder,
  profileImage,
  Zoom,
}) => {
  const router = useRouter();

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
        sizes={isLarge ? "128px" : "48px"}
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={Zoom ? handleClick : onClick}
        src={profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;
