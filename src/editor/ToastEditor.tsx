import { Box } from "@mui/material";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import TuiEditor, { TuiEditorHandle } from "./TuiEditor";
import { useEffect, useRef } from "react";
import "tui-color-picker/dist/tui-color-picker.css";

type Props = {
  initialHtml?: string;
  externalHtml?: string;
  onChange?: (html: string) => void;
};

const ToastEditor = ({ initialHtml, externalHtml, onChange }: Props) => {
  const editorRef = useRef<TuiEditorHandle>(null);

  useEffect(() => {
    const inst = editorRef.current?.getInstance();
    if (!inst) return;
    if (typeof externalHtml !== "string") return;

    const current = (inst.getHTML?.() as string) ?? "";
    const norm = (s: string) => s.replace(/\s+/g, " ").trim();
    if (norm(current) === norm(externalHtml)) return;

    inst.setHTML(externalHtml);
  }, [externalHtml]);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  return (
    <Box sx={{ height: "100%", minHeight: 0 }}>
      <TuiEditor
        ref={editorRef}
        initialValue={initialHtml ?? ""}
        initialEditType="wysiwyg"
        usageStatistics={false}
        hideModeSwitch={true}
        previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
        height="100%"
        toolbarItems={toolbarItems}
        onChange={() => {
          const inst = editorRef.current?.getInstance();
          const html = (inst?.getHTML?.() as string) ?? "";
          onChange?.(html);
        }}
        plugins={[colorSyntax]}
      />
    </Box>
  );
};

export default ToastEditor;
