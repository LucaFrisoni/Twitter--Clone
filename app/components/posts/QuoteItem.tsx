"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";
import { useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";
import axios from "axios";
import toast from "react-hot-toast";

interface QuoteItemProps {
  data: any;
}

const QuoteItem = ({ data }: QuoteItemProps) => {
  const router = useRouter();

  const user = useSelector((state: any) => state.user);

  const { onClose } = useQuoteModel();

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (data.userQuote) {
        return router.push(`/posts/${data.postId._id}`);
      }
      if (data.userRetweet) {
        return router.push(`/posts/${data.postId._id}`);
      }
      router.push(`/posts/${data._id}`);
    },
    [router, data]
  );

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      if (data.userQuote) {
        return router.push(`/users/${data.userQuote.user?._id}`);
      }
      if (data.userRetweet) {
        onClose();
        return router.push(`/users/${data.postId.user?._id}`);
      }

      router.push(`/users/${data.user?._id}`);
      onClose();
    },
    [router, data.user?._id]
  );

  const createdAt = useMemo(() => {
    if (data.userQuote) {
      return formatDistanceToNowStrict(new Date(data.postId.createdAt));
    }
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const handleDropdownClick = (event: any) => {
    event.stopPropagation(); // Evita la propagación del evento al elemento padre
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://backlitter.onrender.com/quotes?quoteId=${data._id}`
      );
      router.refresh();
      return toast.success("Quote Deleted");
    } catch (error) {
      console.log(error);
      return toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full">
      {data.userRetweet ? (
        <div className=" flex flex-row items-start gap-3 border border-neutral-800 p-2 rounded-lg mt-2">
          <Avatar
            profileImage={data.postId.user?.profileImage}
            userId={data.postId.user?._id}
          />

          <div>
            <div className="flex flex-row items-center gap-2 ">
              <p className=" text-white font-semibold cursor-pointer hover:underline">
                {data.postId.user?.name}
              </p>
              <span
                onClick={goToUser}
                className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
              >
                @{data.postId.user?.username}
              </span>
              <span className=" text-neutral-500 text-sm">{createdAt}</span>
            </div>
            <div className=" text-white mt-1 max-w-sm ">
              <p className="whitespace-pre-line break-words">
                {data.postId.body}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {data.user ? (
        <div className=" flex flex-row items-start gap-3 border border-neutral-800 p-2 rounded-lg mt-2">
          <Avatar
            profileImage={data.user?.profileImage}
            userId={data.user?._id}
          />

          <div>
            <div className="flex flex-row items-center gap-2 ">
              <p className=" text-white font-semibold cursor-pointer hover:underline">
                {data.user?.name}
              </p>
              <span
                onClick={goToUser}
                className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
              >
                @{data.user?.username}
              </span>
              <span className=" text-neutral-500 text-sm">{createdAt}</span>
            </div>
            <div className=" text-white mt-1 max-w-sm ">
              <p className="whitespace-pre-line break-words">{data.body}</p>
            </div>
          </div>
        </div>
      ) : null}

      {data.userQuote ? (
        <div>
          {/* Quote User */}
          <div className=" flex flex-row items-start gap-3">
            <Avatar
              profileImage={data.userQuote.profileImage}
              userId={data.userQuote._id}
            />

            <div>
              <div className="flex flex-row items-center gap-2 ">
                <p className=" text-white font-semibold cursor-pointer hover:underline">
                  {data.userQuote.name}
                </p>
                <span
                  onClick={goToUser}
                  className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
                >
                  @{data.userQuote.username}
                </span>
                <span className=" text-neutral-500 text-sm">{createdAt}</span>
                <div
                  className="flex justify-center items-center group absolute right-5 "
                  onClick={handleDropdownClick}
                >
                  <div className="bg-sky-500/10 h-9 w-9 rounded-full absolute hidden group-hover:flex transition"></div>
                  <div className=" z-20">
                    {/* Delete Menu */}
                    {data.userQuote.email == user?.email ? (
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
              <div className=" text-white mt-1 max-w-sm ">
                <p className="whitespace-pre-line break-words">{data.body}</p>
              </div>
            </div>
          </div>
          {/* PostUser */}

          <div className="flex items-center justify-center ">
            <div
              onClick={goToPost}
              className="hover:bg-neutral-800 w-[80%] flex flex-row items-start gap-3 border border-neutral-800 p-2 rounded-lg mt-2"
            >
              <Avatar
                profileImage={data.postId.user?.profileImage}
                userId={data.postId.user?._id}
              />

              <div>
                <div className="flex flex-row items-center gap-2 ">
                  <p className=" text-white font-semibold cursor-pointer hover:underline">
                    {data.postId.user?.name}
                  </p>
                  <span
                    onClick={goToUser}
                    className=" text-neutral-500 cursor-pointer hover:underline hidden md:block"
                  >
                    @{data.postId.user?.username}
                  </span>
                  <span className=" text-neutral-500 text-sm">{createdAt}</span>
                </div>
                <div className=" text-white mt-1 max-w-sm ">
                  <p className="whitespace-pre-line break-words">
                    {data.postId.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default QuoteItem;
