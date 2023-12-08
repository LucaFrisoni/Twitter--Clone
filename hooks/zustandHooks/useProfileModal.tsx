import { create } from "zustand";

interface ProfileModalStore {
  isOpen: boolean;
  onOpen: (image: string) => void;
  onClose: () => void;
  image: string;
}

const useProfileModel = create<ProfileModalStore>((set) => ({
  image: "",
  isOpen: false,
  onOpen: (image = "") => set({ isOpen: true, image }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfileModel;
