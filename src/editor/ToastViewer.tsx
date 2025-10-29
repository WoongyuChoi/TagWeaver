import { Box } from "@mui/material";
import ViewerRuntime from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { useEffect, useRef } from "react";

type Props = {
  html: string;
};

const ToastViewer = ({ html }: Props) => {
  const rootBoxRef = useRef<HTMLDivElement | null>(null);
  const viewerElRef = useRef<HTMLDivElement | null>(null);
  const instRef = useRef<any>(null);

  useEffect(() => {
    if (!viewerElRef.current) return;

    instRef.current = new (ViewerRuntime as any)({
      el: viewerElRef.current,
      usageStatistics: false,
      initialValue: html || "",
    });

    return () => {
      instRef.current?.destroy?.();
      instRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const inst: any = instRef.current;
    if (!inst) return;

    const currentRoot = rootBoxRef.current?.querySelector(
      ".toastui-editor-contents"
    ) as HTMLElement | null;
    const current = currentRoot?.innerHTML ?? "";

    const norm = (s: string) => s.replace(/\s+/g, " ").trim();
    if (norm(current) === norm(html || "")) return;

    if (typeof inst.setHTML === "function") inst.setHTML(html || "");
    else if (typeof inst.setMarkdown === "function")
      inst.setMarkdown(html || "");

    if (currentRoot) {
      currentRoot
        .querySelectorAll<HTMLAnchorElement>("a[href]")
        .forEach((a) => {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
        });
    }
  }, [html]);

  useEffect(() => {
    const container = rootBoxRef.current;
    if (!container) return;

    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;

      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const href = a.getAttribute("href") || "";
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      e.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    };

    container.addEventListener("click", onClick);
    return () => container.removeEventListener("click", onClick);
  }, []);

  return (
    <Box
      ref={rootBoxRef}
      sx={{ height: "100%", minHeight: 0, overflow: "auto" }}
    >
      <div ref={viewerElRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default ToastViewer;
