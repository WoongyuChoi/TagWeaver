import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import TiptapEditor from "./TiptapEditor";
import HtmlViewer from "../component/HtmlViewer";
import useContentStore from "../store/contentStore";
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

const ColumnTiptap = () => {
  const [html, setHtml] = useState<string>("<p></p>");
  const randomHtml = useContentStore((s) => s.randomHtml);
  const tiptapExternal = useEditorSyncStore((s) => s.tiptapHtml);

  // useEffect(() => {
  //   if (randomHtml) setHtml(randomHtml);
  // }, [randomHtml]);

  useEffect(() => {
    if (tiptapExternal) setHtml(tiptapExternal);
  }, [tiptapExternal]);
  
  return (
    <Stack spacing={2}>
      <Section title="Editor (Tiptap)" height={280}>
        <Box sx={{ height: "100%", minHeight: 0 }}>
          <TiptapEditor initialHtml="<p></p>" externalHtml={tiptapExternal} onChange={setHtml} />
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

      <Section title="Sanitized Preview" height={220}>
        <HtmlViewer html={html} />
      </Section>
    </Stack>
  );
};

export default ColumnTiptap;
