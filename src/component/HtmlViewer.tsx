import { Box } from "@mui/material";
import DOMPurify from "dompurify";
import { useMemo } from "react";

type Props = { html: string };

const HtmlViewer = ({ html }: Props) => {
  const safe = useMemo(() => {
    return DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true, svg: true, mathMl: true },
      ALLOW_DATA_ATTR: true,
      ADD_TAGS: [
        "table", "thead", "tbody", "tfoot", "tr", "th", "td",
        "col", "colgroup"
      ],
      ADD_ATTR: [
        "class", "id", "style",
        "width", "height", "align", "border",
        "rowspan", "colspan", "cellpadding", "cellspacing",
        "border", "valign", "scope", "role", "aria-label", "aria-hidden",
        "data-row", "data-cell", "data-col",
      ],
      FORBID_TAGS: ["script", "noscript", "base", "meta", "object", "embed", "applet", "frame"," frameset",],
      // FORBID_ATTR: [/^on/i],
    });
  }, [html]);

  return (
    <Box
      sx={{
        "& table": { borderCollapse: "collapse", width: "100%" },
        "& th, & td": {
          border: "1px solid",
          borderColor: "divider",
          padding: "4px",
          // verticalAlign: "top",
        },
        "& thead th": { bgcolor: "background.default", fontWeight: 600 },
        "& .ql-align-center": { textAlign: "center" },
        "& .ql-align-right": { textAlign: "right" },
        "& .ql-align-justify": { textAlign: "justify" },
        "& p": { margin: "0 0 .25rem" },
      }}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
};

export default HtmlViewer;
