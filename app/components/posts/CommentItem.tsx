"use client";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { BsFillTrashFill } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

interface CommentItemProps {
  data: any;
  onRefresh?: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ data, onRefresh }) => {
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  const goToUser = useCallback(
    (event: any) => {
      // detiene el onclick del padre
      event.stopPropagation();
      router.push(`/users/${data.userId?._id}`);
    },
    [router, data.userId?._id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const handleDropdownClick = (event: any) => {
    event.stopPropagation(); // Evita la propagación del evento al elemento padre
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backlitter.onrender.com/delete/posts?postId=${data.postId}&commentId=${data._id}`
      );
      // router.refresh();
      toast.success("Comment Deleted");

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
  };
  console.log("Coment Data", data);
  return (
    <div className=" bg-neutral-900 border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-800 transition relative">
      <div className=" flex flex-row items-start gap-3">
        <Avatar
          profileImage={data.userId?.profileImage}
          userId={data.userId?._id}
        />
        <div>
          <div className=" flex flex-row items-center gap-2 ">
            <p className=" text-white font-semibold cursor-pointer hover:underline">
              {data.userId?.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-400  cursor-pointer hover:underline hidden md:block "
            >
              @{data.userId?.username}
            </span>
            <span className=" text-neutral-500 text-sm ">{createdAt}</span>
            <div
              className="flex justify-center items-center group absolute right-5 "
              onClick={handleDropdownClick}
            >
              <div className="bg-sky-500/10 h-9 w-9 rounded-full absolute  hidden group-hover:flex transition"></div>
              <div className=" z-20">
                {/* Delete Menu */}
                {data.userId.email == user?.email ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <FiMoreHorizontal className=" text-neutral-500 hover:text-sky-700 transition  " />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className=" min-w-[230px]  hover:bg-neutral-900"
                      side="bottom"
                      style={{
                        boxShadow: " 0 0 10px rgba(74, 85, 104)",
                        background:
                          "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
                      }}
                    >
                      <DropdownMenuItem
                        className="flex gap-x-2 w-full bg-black"
                        onClick={handleDelete}
                      >
                        <BsFillTrashFill className="text-red-700 ml-1.5" />
                        <span className="text-red-700 font-bold text-base">
                          Delete
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : null}
              </div>
            </div>
          </div>
          <div className=" text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
