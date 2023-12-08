"use client";
import useLoginModel from "@/hooks/zustandHooks/useLoginModel";
import React, { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModel from "@/hooks/zustandHooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import usePasswordModal from "@/hooks/zustandHooks/useChangePasswordModel";

const LoginModal = () => {

  
  const loginModal = useLoginModel();
  const registerModal = useRegisterModel();
  const passwordModal = usePasswordModal();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal, isLoading]);
  const onToggle2 = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    passwordModal.onOpen();
  }, [passwordModal, loginModal, isLoading]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      //TODO ADD LOGIN
      if (!email || !password) {
        return toast.error("You must enter you email and password");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Importante para que no redirija en caso de error
      });

      if (result?.error) {
        // Manejar los errores en base a la información en result.error
        if (result.error === "User not found") {
          toast.error("Email not found");
        } else if (result.error === "Wrong Password") {
          toast.error("Incorrect password. Please try again.");
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      }
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
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
        Don`t have an account?
        <span
          onClick={onToggle}
          className=" text-white cursor-pointer hover:underline"
        >
          {" "}
          Create Account
        </span>
      </p>
      <p>
        Forgot Password?
        <span
          onClick={onToggle2}
          className=" text-white cursor-pointer hover:underline"
        >
          {" "}
          Change Password
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
