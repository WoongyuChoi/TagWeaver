import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { Box } from "@mui/material";
import { $getRoot, EditorState, LexicalEditor } from "lexical";
import { useEffect, useMemo } from "react";
import LexicalToolbar from "./LexicalToolbar";

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
  externalHtml?: string;
};

function InnerEditor({
  onChange,
  externalHtml,
}: {
  onChange?: (html: string) => void;
  externalHtml?: string;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor || !externalHtml) return;
    const parser = new DOMParser();
    const dom = parser.parseFromString(externalHtml, "text/html");
    editor.update(() => {
      const nodes = $generateNodesFromDOM(editor, dom);
      const root = $getRoot();
      root.clear();
      root.append(...nodes);
    });
  }, [externalHtml, editor]);

  const handleChange = (state: EditorState, ed: LexicalEditor) => {
    let html = "";
    state.read(() => {
      html = $generateHtmlFromNodes(ed);
    });
    onChange?.(html);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        p: 1.5,
        height: "100%",
        minHeight: 160,
        overflowY: "auto",
        position: "relative",
        "& .editor-input": { outline: "none", minHeight: 140 },
      }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={
          <Box
            sx={{ px: 1, color: "text.disabled", position: "absolute", top: 8 }}
          >
            Start typing…
          </Box>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={handleChange} />
    </Box>
  );
}

const LexicalEditorComp = ({ initialHtml, onChange, externalHtml }: Props) => {
  const initialConfig = useMemo(
    () => ({
      namespace: "TagWeaver-Lexical",
      theme: {},
      onError: (e: Error) => console.error(e),
      editorState: (editor: LexicalEditor) => {
        if (initialHtml) {
          const parser = new DOMParser();
          const dom = parser.parseFromString(initialHtml, "text/html");
          editor.update(() => {
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = $getRoot();
            root.clear();
            root.append(...nodes);
          });
        }
      },
      nodes: [],
    }),
    [initialHtml]
  );

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalToolbar />
      <InnerEditor onChange={onChange} externalHtml={externalHtml} />
    </LexicalComposer>
  );
};

export default LexicalEditorComp;
