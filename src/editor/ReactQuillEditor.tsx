import { Box } from "@mui/material";
import QuillTableBetter from "quill-table-better";
import "quill-table-better/dist/quill-table-better.css";
import { useEffect, useMemo, useRef } from "react";
// import ReactQuill, { Quill } from "react-quill";
import ReactQuill, { Quill } from "react-quill-new";
// import "react-quill/dist/quill.snow.css";
import "react-quill-new/dist/quill.snow.css";

if ((Quill as any)?.register) {
  (Quill as any).register({ "modules/table-better": QuillTableBetter }, true); // overwrite 허용
}

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
};

const ReactQuillEditor = ({ initialHtml = "<p></p>", onChange }: Props) => {
  const ref = useRef<ReactQuill | null>(null);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline"],
        [
          { list: "ordered" },
          { list: "bullet" },
          // { indent: "-1" },
          // { indent: "+1" },
        ],
        [{ align: [] }],
        ["link", "image", "code-block", "clean"],
        [{ color: [] }, { background: [] }],
        // [{ script: 'sub' }, { script: 'super' }],
        ["table-better"],
      ],
      clipboard: { matchVisual: false },
      table: false,
      "table-better": {
        language: "en_US",
        menus: ["column", "row", "merge", "table", "cell", "wrap", "copy", "delete"],
        toolbarTable: true,
      },
      keyboard: {
        bindings: (QuillTableBetter as any).keyboardBindings,
      },
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    // "strike",
    // "blockquote",
    "list",
    // "indent",
    "align",
    "link",
    // "script",
    "code-block",
    "color",
    "background",
    // "table","table-better","table-row","table-cell","table-col"
  ];

  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    const inst = ref.current?.getEditor();
    if (!inst) return;
    // const current = ref.current!.editor!.root.innerHTML;
    const current = (ref.current!.editor!.root as HTMLElement).innerHTML;
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
        // formats={formats} // 모든 포맷 허용
        style={{ height: "100%" }}
      />
    </Box>
  );
};

export default ReactQuillEditor;
