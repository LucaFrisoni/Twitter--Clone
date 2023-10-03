import { create } from "zustand";

interface QuoteModelStore {
  isOpen: boolean;
  onOpen: (data: any) => void;
  onClose: () => void;
  data: any;
}

const useQuoteModel = create<QuoteModelStore>((set) => ({
  data: {},
  isOpen: false,
  onOpen: (data = {}) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default useQuoteModel;
