"use client";
import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Form from "./Form";

interface ModalQuoteProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  disabled?: boolean;
  data: any;
  onRefresh:()=>void
}

const ModalQuote: React.FC<ModalQuoteProps> = ({
  title,
  onClose,
  disabled,
  isOpen,
  data,
  onRefresh,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className=" fixed justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
      <div className=" relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
        {/* content */}
        <div className=" h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
          {/* Header */}
          <div className=" flex items-center justify-between p-10 rounded-t">
            <h3 className=" text-3xl font-semibold text-white">{title}</h3>
            <button
              onClick={handleClose}
              className=" p-1 ml-auto border-0 text-white hover:opacity-70 transition"
            >
              <AiOutlineClose size={20} color="white" />
            </button>
          </div>
          {/* Body */}
          <div className=" relative p-10 flex-auto">
            <Form
              placeholder="Add a Quote"
              quote={true}
              data={data}
              onRefresh={onRefresh}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalQuote;
