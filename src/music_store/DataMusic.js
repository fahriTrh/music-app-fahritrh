import { create } from "zustand";


const useDataMusic = create((set) => ({
  data: {},
  setData: (newdata) => set({ data: newdata }),
}));

export default useDataMusic;
