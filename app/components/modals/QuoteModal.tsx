import useQuoteModel from "@/hooks/zustandHooks/useQuoteModal";
import React from "react";
import Input from "../Input";
import Form from "../Form";
import Modal from "../Modal";
import ModalQuote from "../ModalQuote";
const QuoteModal = () => {
  const { isOpen, data, onClose } = useQuoteModel();



  return (
    <div>
      <ModalQuote
        isOpen={isOpen}
        title="Create a Quote"
        onClose={onClose}
        data={data}
      />
    </div>
  );
};

export default QuoteModal;
