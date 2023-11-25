import { create } from "zustand";


const useMusicStore = create((set) => ({
  music: null,
  setMusic: (newMusic) => set({ music: newMusic }),
}));

export default useMusicStore;
