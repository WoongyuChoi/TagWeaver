import { Button, Box } from "@mui/material";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";

const LexicalToolbar = () => {
  const [editor] = useLexicalComposerContext();

  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}>
        Undo
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}>
        Redo
      </Button>

      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
        Bold
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
        Italic
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
        Underline
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}>
        Code
      </Button>

      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}>
        Left
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}>
        Center
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}>
        Right
      </Button>
      <Button size="small" variant="outlined" onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")}>
        Justify
      </Button>
    </Box>
  );
};

export default LexicalToolbar;
