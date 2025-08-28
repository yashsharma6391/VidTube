import { useState } from "react";
const CommentBox = ({ text = "" }) => {
  const [expanded, setExpanded] = useState(false);

  const cleanText = text.replace(/[`]/g, "").trim();
  const words = cleanText.split(/\s+/);
  const previewWords = words.slice(0, 6).join(" ");
  const lineBreaks = cleanText.split("\n").length;

  const isLong = words.length > 10 || lineBreaks > 7;

  return (
    <div style={{ whiteSpace: "pre-wrap" }}>
      <p style={{ marginBottom: "4px" }}>
        {expanded || !isLong ? cleanText : `${previewWords}...`}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            background: "none",
            color: "#007BFF",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: "0.6rem"
          }}
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};
export default CommentBox;