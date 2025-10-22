import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ReactQuillEditor from "./ReactQuillEditor";
import HtmlViewer from "../component/HtmlViewer";
import useContentStore from "../store/contentStore";

const Section = ({
  title,
  children,
  height = 240,
}: {
  title: string;
  children?: React.ReactNode;
  height?: number;
}) => (
  <Stack spacing={1}>
    <Typography variant="subtitle1" fontWeight={600}>
      {title}
    </Typography>
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height,
        p: 2,
        bgcolor: "background.paper",
        overflow: "auto",
        minHeight: 0,
      }}
    >
      {children}
    </Box>
  </Stack>
);

const ColumnReactQuill = () => {
  const [html, setHtml] = useState<string>("");
  const randomHtml = useContentStore((s) => s.randomHtml);

  useEffect(() => {
    if (randomHtml) setHtml(randomHtml);
  }, [randomHtml]);
  
  return (
    <Stack spacing={2} sx={{ minHeight: 0 }}>
      <Section title="Editor(ReactQuill)" height={280}>
        <Box sx={{ height: "100%", minHeight: 0 }}>
          <ReactQuillEditor initialHtml={html} onChange={setHtml} />
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

export default ColumnReactQuill;
