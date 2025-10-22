import { create } from "zustand";
import { normalizeQuillBetterTable } from "../utils/htmlNormalize";

interface State {
  tiptapHtml: string;
  lexicalHtml: string;
  quillHtml: string;
};

interface Actions {
  setTiptap: (html: string) => void;
  setLexical: (html: string) => void;
  setQuill: (html: string) => void;
  normalizeAndSyncFromQuill: () => string; // 변환된 HTML 반환(로그/디버그용)
};

const useEditorSyncStore = create<State & Actions>((set, get) => ({
  tiptapHtml: "<p></p>",
  lexicalHtml: "<p></p>",
  quillHtml: "<p></p>",

  setTiptap: (html) => set({ tiptapHtml: html }),
  setLexical: (html) => set({ lexicalHtml: html }),
  setQuill: (html) => set({ quillHtml: html }),

  normalizeAndSyncFromQuill: () => {
    const src = get().quillHtml || "<p></p>";
    const normalized = normalizeQuillBetterTable(src, {
      promoteFirstRowToThead: false, // 필요 시 true
    });
    set({
      tiptapHtml: normalized,
      lexicalHtml: normalized,
    });
    return normalized;
  },
}));

export default useEditorSyncStore;
