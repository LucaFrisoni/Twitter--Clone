import { create } from "zustand";

interface QuoteModelStore {
  isOpen: boolean;
  onOpen: (data: any, onRefresh?: () => void) => void; // Modificamos la firma de onOpen
  onClose: () => void;
  data: any;
  onRefresh:any
}

const useQuoteModel = create<QuoteModelStore>((set) => ({
  data: {},
  isOpen: false,
  onRefresh:()=>{},
  onOpen: (data = {}, onRefresh) => set({ isOpen: true, data, onRefresh }), // Pasamos onRefresh a set
  onClose: () => set({ isOpen: false }),
}));

export default useQuoteModel;
