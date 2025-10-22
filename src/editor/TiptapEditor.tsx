import { Box, Button, Stack } from "@mui/material";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
  externalHtml?: string;
};

const TiptapEditor = ({ initialHtml, onChange, externalHtml }: Props) => {
  const TOOLBAR_H = 40;
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
    ],
    // content: initialHtml ?? "<p></p>",
    autofocus: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      if (onChange) onChange(html);
    },
  });

  useEffect(() => {
    if (editor && typeof externalHtml === "string") {
      editor.commands.setContent(externalHtml);
    }
  }, [externalHtml, editor]);

  if (!editor) return null;

  return (
    <Stack spacing={1}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
          minHeight: TOOLBAR_H,
        }}
      >
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().toggleBold().run()}>Bold</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().toggleUnderline().run()}>Underline</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().toggleBulletList().run()}>UL</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().toggleOrderedList().run()}>OL</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().setTextAlign("left").run()}>Left</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().setTextAlign("center").run()}>Center</Button>
        <Button size="small" variant="outlined" onClick={() => editor.chain().focus().setTextAlign("right").run()}>Right</Button>
        {/* <Button size="small" variant="outlined" onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 2, withHeaderRow: true }).run()}>Table</Button> */}
      </Box>

      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          p: 1.5,
          height: "calc(100% - 0px)",
          overflowY: "auto",
          "& .tiptap": {
            outline: "none",
            minHeight: 160,
          },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Stack>
  );
};

export default TiptapEditor;
