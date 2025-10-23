import { Box } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

type Props = {
  html: string;
};

const ToastViewer = ({ html }: Props) => {
  const ref = useRef<Viewer>(null);

  useEffect(() => {
    const inst = ref.current?.getInstance();
    if (!inst) return;

    const anyInst = inst as any;
    if (typeof anyInst.setHTML === "function") {
      anyInst.setHTML(html || "");
      return;
    }

    if (typeof anyInst.setMarkdown === "function") {
      anyInst.setMarkdown(html || "");
    }
  }, [html]);

  return (
    <Box sx={{ height: "100%", minHeight: 0, overflow: "auto" }}>
      <Viewer ref={ref} initialValue={html || ""} usageStatistics={false} />
    </Box>
  );
};

export default ToastViewer;
