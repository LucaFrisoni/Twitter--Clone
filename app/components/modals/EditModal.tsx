"use client";
import React, { useCallback, useEffect, useState } from "react";


import useEditModel from "@/hooks/zustandHooks/useEditModel";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

import Modal from "../Modal";
import Input from "../Input";

import ImageUpload from "../ImageUpload";
import { useSelector } from "react-redux";

const EditModal = () => {
  const editModal = useEditModel();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | undefined>("");
  const [coverImage, setCoverImage] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");
  const [username, setUserName] = useState<string | undefined>("");
  const [bio, setBio] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");

  const user = useSelector((state: any) => state.user);

  useEffect(() => {
    setEmail(user?.email);
    setProfileImage(user?.profileImage);
    setCoverImage(user?.coverImage);
    setName(user?.name);
    setUserName(user?.username);
    setBio(user?.bio);
  }, [
    user?.email,
    user?.profileImage,
    user?.coverImage,
    user?.name,
    user?.bio,
    user?.username,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await axios.patch("https://backlitter.onrender.com/edit", {
        email,
        name,
        profileImage,
        coverImage,
        bio,
        username,
      });
      editModal.onClose();
      router.refresh();
      toast.success("Update");
    } catch (error: any) {
      if (error.response.data == "Username Already Exist") {
        return toast.error("Username Already Exist");
      }
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [bio, name, username, profileImage, coverImage, email, router, editModal]);

  const bodyContent = (
    <div className=" flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => {
          setProfileImage(image);
        }}
        label="Upload profile image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload cover image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit your profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;
