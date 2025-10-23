import { create } from "zustand";
import { buildSampleHtml } from "../utils/randomHtml";

interface ContentState {
  randomHtml: string;
  generate: () => void;
  setHtml: (html: string) => void;
}

const useContentStore = create<ContentState>((set) => ({
  randomHtml: "<p></p>",
  generate: () => set({ randomHtml: buildSampleHtml() }),
  setHtml: (html) => set({ randomHtml: html }),
}));

export default useContentStore;