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
  const [currentPassword, setCurrentPassword] = useState("");
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
        placeholder="Current Password"
        onChange={(e) => {
          setCurrentPassword(e.target.value);
        }}
        value={currentPassword}
        disabled={isLoading}
        type="password"
      />
      <Input
        placeholder="New Password"
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
      //TODO ADD LOGIN
      if (!email || !currentPassword || !password) {
        return toast.error("You must enter you email and a password change");
      }
      if (password !== confirmPassword) {
        return toast.error("Passwords are not the same");
      }
      const result = await axios.put(
        "https://backlitter.onrender.com/passwordChange",
        { email, currentPassword, password }
      );
      router.refresh();
      toast.success("Password Change");
      passwordModal.onClose();
    } catch (error: any) {
      if (error.response.data == "Invalid email or current password") {
        return toast.error("Invalid email or current password");
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
  }, [passwordModal, email, currentPassword, password, confirmPassword]);

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
