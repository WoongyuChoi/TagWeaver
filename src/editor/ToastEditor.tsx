import { Box } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

type Props = {
  initialHtml?: string;
  externalHtml?: string;
  onChange?: (html: string) => void;
};

const ToastEditor = ({ initialHtml = "", externalHtml, onChange }: Props) => {
  const ref = useRef<Editor>(null);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"],
    ["code"],
    ["scrollSync"],
  ];

  useEffect(() => {
    const inst = ref.current?.getInstance();
    if (!inst || !initialHtml) return;
    inst.setHTML(initialHtml);
  }, [initialHtml]);

  useEffect(() => {
    const inst = ref.current?.getInstance();
    if (!inst || typeof externalHtml !== "string") return;
    inst.setHTML(externalHtml);
  }, [externalHtml]);

  return (
    <Box sx={{ height: "100%", minHeight: 0 }}>
      <Editor
        ref={ref}
        initialEditType="wysiwyg"
        usageStatistics={false}
        hideModeSwitch={true}
        previewStyle={window.innerWidth > 1000 ? "vertical" : "tab"}
        height="100%"
        toolbarItems={toolbarItems}
        onChange={() => {
          const inst = ref.current?.getInstance();
          const html = inst?.getHTML() ?? "";
          onChange?.(html);
        }}
      />
    </Box>
  );
};

export default ToastEditor;
