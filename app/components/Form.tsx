"use client";

import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import useRegisterModal from "@/hooks/zustandHooks/useRegisterModal";

import axios from "axios";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Smile } from "lucide-react";
import QuoteItem from "./posts/QuoteItem";
import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  quote?: boolean;
  data?: any;
  onRefresh: () => void;
}

const Form: React.FC<FormProps> = ({
  data,
  placeholder,
  isComment,
  postId,
  quote,
  onRefresh,
}) => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModel();
  const quoteModal = useQuoteModel();
  const user = useSelector((state: any) => state.user);

  const [body, setBody] = useState("");
  const [limit, setLimit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLimit(false);
      // aca crea una funcion que se fije si body no tiene ningun caracter y son solo espacios de retornar un toast.error que dija debes you must write a tweet

      if (body.trim().length === 0) {
        return toast.error("Tweets cannot have empty spaces");
      }

      if (body.length > 400) {
        setLimit(true);
        return;
        // router.refresh()
      }
      setIsLoading(true);

      const email = user?.email;

      if (quote) {
        if (data.userRetweet) {
          await axios.post("https://backlitter.onrender.com/quotes", {
            postId: data.postId._id,
            userQuote: user._id,
            body,
          });
        } else {
          await axios.post("https://backlitter.onrender.com/quotes", {
            postId: data._id,
            userQuote: user._id,
            body,
          });
        }
        toast.success("Quote Created");
        setBody("");
        quoteModal.onClose();
        // router.refresh();
        onRefresh();
        setIsLoading(false);
        return;
      }

      if (isComment) {
        await axios.post("https://backlitter.onrender.com/comments", {
          body,
          postId,
          currentUserId: user._id,
        });
        toast.success("Comment Created");
        setBody("");
        // router.refresh();
        onRefresh();
        setIsLoading(false);
        return;
      }
      await axios.post("https://backlitter.onrender.com/posts", {
        body,
        email,
      });

      toast.success("Tweet Created");
      setBody("");
      // router.refresh();
      onRefresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, router, isComment, postId, user?.email, user?._id, quote]);

  const debounceTweet = debounce(onSubmit, 1000);

  const handleEmoji = (data: any) => {
    console.log(data);
    setBody((prevBody) => prevBody + data.emoji);
  };

  return (
    <div className=" border-b-[1px] border-neutral-800 px-5 py-2">
      {user ? (
        <div className=" flex flex-row gap-4">
          <div>
            <Avatar
              profileImage={user?.profileImage}
              userId={user?._id}
              flag={true}
            />{" "}
          </div>
          <div className=" w-full ">
            <textarea
              // onKeyPress={handleKeyPress}
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
            {/* Quote Tweets */}
            {quote === true ? (
              <QuoteItem onRefresh={onRefresh} data={data} />
            ) : null}
            {/* Nuevas features */}
            <div className=" mt-4 flex flex-row justify-between">
              <div className="hidden sm:flex align-bottom">
                <Popover>
                  <PopoverTrigger>
                    <Smile className="text-sky-500  hover:text-sky-600  transition" />
                  </PopoverTrigger>
                  <PopoverContent
                    side="bottom"
                    sideOffset={40}
                    className="bg-transparent border-none shadow-none drop-shadow-none mb-16 "
                  >
                    <EmojiPicker
                      height={400}
                      width={300}
                      onEmojiClick={handleEmoji}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {limit && (
                <p className=" text-red-800 p-3">Maximum 400 characters</p>
              )}
              <Button
                disabled={isLoading || !body}
                label="Tweet"
                onClick={debounceTweet}
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
