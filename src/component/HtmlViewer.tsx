import DOMPurify from "dompurify";

type Props = { html?: string };
const HtmlViewer = ({ html }: Props) => {
  const safe = DOMPurify.sanitize(html ?? "", {
    ALLOWED_TAGS: [
      "p",
      "b",
      "i",
      "u",
      "span",
      "strong",
      "em",
      "table",
      "thead",
      "tbody",
      "tr",
      "td",
      "th",
      "h1",
      "h2",
      "h3",
      "ul",
      "ol",
      "li",
      "a",
      "blockquote",
      "pre",
      "code",
      "br",
      "hr",
    ],
    ALLOWED_ATTR: ["href", "target", "style", "colspan", "rowspan", "title"],
  });
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
};

export default HtmlViewer;
