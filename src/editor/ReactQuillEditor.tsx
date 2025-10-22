import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
};

const ReactQuillEditor = ({ initialHtml = "<p></p>", onChange }: Props) => {
  const ref = useRef<ReactQuill | null>(null);
  
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "code-block", "clean"],
      [{ color: [] }, { background: [] }],
      ["table"]
    ],
  }), []);

  const formats = [
    "header","bold","italic","underline",
    "list","bullet","align","link","code-block","color","background"
  ];

  useEffect(() => {
    const inst = ref.current?.getEditor();
    if (!inst) return;
    const current = ref.current!.editor!.root.innerHTML;
    if (current !== initialHtml) {
      inst.clipboard.dangerouslyPasteHTML(initialHtml);
    }
  }, [initialHtml]);

  return (
    <Box sx={{ height: "100%", minHeight: 0 }}>
      <ReactQuill
        ref={ref}
        theme="snow"
        value={initialHtml}
        // defaultValue={initialHtml}
        onChange={(html) => onChange?.(html)}
        modules={modules}
        formats={formats}
        style={{ height: "100%" }}
      />
    </Box>
  );
};

export default ReactQuillEditor;
