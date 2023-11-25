import { create } from "zustand";


const usePlayOrPause = create((set) => ({
  play: false,
  setPlay: (state) => set({ play: state }),
}));

export default usePlayOrPause;
