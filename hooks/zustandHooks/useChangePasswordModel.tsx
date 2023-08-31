import { create } from "zustand";

interface PasswordModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePasswordModal = create<PasswordModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePasswordModal;
