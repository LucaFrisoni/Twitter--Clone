"use client";

import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModel from "@/hooks/zustandHooks/useRegisterModal";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const loginModal = useLoginModel();
  const registerModal = useRegisterModel();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!email || !password || !name || !username) {
        return toast.error("You should provide all the required fields");
      }
      // backlitter.onrender.com/register
      https: await axios.post("https://backlitter.onrender.com/register", {
        email,
        password,
        username,
        name,
      });
      toast.success("Account Created");

      registerModal.onClose();
      signIn("credentials", { email, password });
    } catch (error: any) {
    
      if (error?.response.data === "Invalid email format") {
        return toast.error("Invalid email format");
      }

      if (error?.response.data === "User Already Exist") {
        return toast.error("User Already Exist");
      }

      if (error?.response.data === "Username Already Exist") {
        return toast.error("Username Already Exist");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        disabled={isLoading}
        type="email"
      />
      <Input
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        disabled={isLoading}
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className=" text-neutral-400 text-center mt-4">
      <p>
        Already have an account?
        <span
          onClick={onToggle}
          className=" text-white cursor-pointer hover:underline"
        >
          {" "}
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Create an Account"
      actionLabel="Register"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
