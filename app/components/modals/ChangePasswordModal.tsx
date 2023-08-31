"use client";
import React, { useCallback, useState } from "react";
import Modal from "../Modal";
import usePasswordModal from "@/hooks/zustandHooks/useChangePasswordModel";
import Input from "../Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const ChangePasswordModal = () => {
  const passwordModal = usePasswordModal();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <Input
        placeholder="Confirm Password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
        value={confirmPassword}
        disabled={isLoading}
        type="password"
      />
    </div>
  );

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log(
        "mail =>",
        email,
        "original =>",
        password,
        "confirm =>",
        confirmPassword
      );
      //TODO ADD LOGIN
      if (!email || !password) {
        return toast.error("You must enter you email and a password change");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords are not the same");
      }
      const result = await axios.put(
        "https://backlitter.onrender.com/passwordChange",
        { email, password }
      );
      router.refresh();
      toast.success("Password Change");
      passwordModal.onClose();
    } catch (error: any) {
      console.log("asd", error);
      if (error.response.data == "User does not exist") {
        return toast.error("User does not exist");
      }
      if (error.response.data == "Passwords are not the same") {
        return toast.error("Passwords are not the same");
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      //   setEmail("");
      //   setPassword("");
      //   setConfirmPassword("");
    }
  }, [passwordModal, email, password, confirmPassword]);

  return (
    <Modal
      disabled={isLoading}
      isOpen={passwordModal.isOpen}
      title="Change Password"
      actionLabel="Submit Change"
      onClose={passwordModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default ChangePasswordModal;
