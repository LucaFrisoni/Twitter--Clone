"use client";

import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import useRegisterModal from "@/hooks/zustandHooks/useRegisterModal";

import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModel();

  const user = useSelector((state: any) => state.user);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const email = user?.email;

      if (isComment) {
        await axios.post(
          "/api/comments",
          {
            body,
            postId,
            currentUserId: user.id,
          }
        );
        toast.success("Comment Created");
        setBody("");
        router.refresh();
        setIsLoading(false);
        return;
      }
      await axios.post(
        "/api/posts",
        { body, email }
      );

      toast.success("Tweet Created");
      setBody("");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, router, isComment, postId, user?.email, user?.id]);

  return (
    <div className=" border-b-[1px] border-neutral-800 px-5 py-2">
      {user ? (
        <div className=" flex flex-row gap-4">
          <div>
            <Avatar userId={user?.id} flag={true} />{" "}
          </div>
          <div className=" w-full ">
            <textarea
              disabled={isLoading}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              value={body}
              className=" disabled:opacity-80 peer
              resize-none
              mt-3
              w-full
              bg-black
              ring-0
              outline-none
              text-[20px]
              placeholder-neutral-500
              text-white"
              placeholder={placeholder}
            ></textarea>
            <hr className="opacity-0 peer-focus:opacity-100 h-1[px] border-neutral-800 transition" />
            <div className=" mt-4 flex flex-row justify-end">
              <Button
                disabled={isLoading || !body}
                label="Tweet"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8 ">
          <h1 className=" text-white text-2xl text-center mb-4 font-bold">
            Welcome to Twitter
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
