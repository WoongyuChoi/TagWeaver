import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ToastEditor from "./ToastEditor";
import ToastViewer from "./ToastViewer";
import HtmlViewer from "../component/HtmlViewer";
import useEditorSyncStore from "../store/editorSyncStore";

const Section = (props: {
  title: string;
  children?: React.ReactNode;
  height?: number;
}) => {
  const h = props.height ?? 240;
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" fontWeight={600}>
        {props.title}
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          height: h,
          p: 2,
          bgcolor: "background.paper",
          overflow: "auto",
          minHeight: 0,
        }}
      >
        {props.children}
      </Box>
    </Stack>
  );
};

const ColumnToast = () => {
  const [html, setHtml] = useState<string>("<p></p>");
  const toastExternal = useEditorSyncStore((s) => s.toastHtml);  
  const setLexical = useEditorSyncStore((s) => s.setLexical);

  useEffect(() => {
    if (typeof external === "string") setHtml(external);
  }, [external]);

  useEffect(() => {
    setLexical(html);
  }, [html, setLexical]);

  return (
    <Stack spacing={2} sx={{ minHeight: 0 }}>
      <Section title="Editor (TOAST UI)" height={280}>
        <Box sx={{ height: "100%", minHeight: 0 }}>
          <ToastEditor
            initialHtml="<p></p>"
            externalHtml={toastExternal}
            onChange={setHtml}
          />
        </Box>
      </Section>

      <Section title="HTML Output" height={180}>
        <Box
          component="pre"
          sx={{ m: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {html}
        </Box>
      </Section>

      <Section title="Preview (TOAST Viewer)" height={220}>
        <ToastViewer html={html} />
      </Section>
    </Stack>
  );
};

export default ColumnToast;
