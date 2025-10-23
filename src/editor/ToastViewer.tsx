import { Box } from "@mui/material";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";

type Props = {
  html: string;
};

const ToastViewer = ({ html }: Props) => {
  const viewerRef = useRef<Viewer>(null);
  const rootBoxRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const inst = viewerRef.current?.getInstance() as any;
    if (!inst) return;

    if (typeof inst.setHTML === "function") inst.setHTML(html || "");
    else if (typeof inst.setMarkdown === "function")
      inst.setMarkdown(html || "");

    const root = rootBoxRef.current?.querySelector(
      ".toastui-editor-contents"
    ) as HTMLElement | null;
    if (root) {
      root.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
    }
  }, [html]);

  return (
    <Box
      ref={rootBoxRef}
      sx={{ height: "100%", minHeight: 0, overflow: "auto" }}
    >
      <Viewer
        ref={viewerRef}
        initialValue={html || ""}
        usageStatistics={false}
        linkAttributes={{ target: "_blank", rel: "noopener noreferrer" }}
      />
    </Box>
  );
};

export default ToastViewer;
