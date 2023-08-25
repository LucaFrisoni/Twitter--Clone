"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Post, User } from "@/types";
import { useRouter } from "next/navigation";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import { useSession } from "next-auth/react";

import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import toast from "react-hot-toast";
import axios from "axios";


interface PostItemProps {
  data: Post;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const { data: session, status } = useSession();

  const router = useRouter();
  const loginModal = useLoginModel();

  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state

  const user = useSelector((state: any) => state.user);

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`http://localhost:3000/users/${data.user?.id}`);
    },
    [router, data.user?.id]
  );


  
useEffect(() => {


  if (data.likeIds) {
    setIsDataLoaded(true);
  }
}, [data.likeIds]);

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`http://localhost:3000/posts/${data.id}`);
    },
    [router, data]
  );

  const isLiked = useMemo(() => {
    if (!isDataLoaded) {
      return false; // O cualquier valor predeterminado según tu lógica
    }

    const list = data.likeIds || [];
    return list.includes(user?.id);
  }, [isDataLoaded, user?.id, data.likeIds]);

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!session) {
        return loginModal.onOpen();
      }
      try {
        if (isLiked) {
          await axios.delete(
            `http://localhost:3000/api/like?postId=${data.id}&currentUserId=${user?.id}`
          );
          toast.success("Post Unliked");
          router.refresh();
        } else {
          await axios.post("http://localhost:3000/api/like", {
            postId: data.id,
            currentUserId: user.id,
          });
          toast.success("Post Liked");
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
    [loginModal, user, data.id, router, isLiked, session]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  return (
    <div
      className="border-b-[1px]
  border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
      onClick={goToPost}
    >
      <div className=" flex flex-row items-start gap-3">
        <Avatar profileImage={data.user?.profileImage} userId={data.user?.id} />

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
            <p className="whitespace-normal break-words">{data.body}</p>
          </div>
          <div className=" flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              {isLiked ? (
                <AiFillHeart color={"red"} size={20} />
              ) : (
                <AiOutlineHeart size={20} />
              )}

              <p>{data.likeIds?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
