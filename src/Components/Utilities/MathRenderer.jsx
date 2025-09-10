import React from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const MathRenderer = ({ content }) => {
  const parsedContent = parseMathString(content);

  return (
    <div>
      {parsedContent.map((item, index) => {
        if (item.type === "math") {
          // Use BlockMath for display equations
          return <BlockMath key={index} math={item.value} />;
        } else {
          return (
            <span key={index} style={{ whiteSpace: "pre-wrap" }}>
              {item.value + " "}
            </span>
          );
        }
      })}
    </div>
  );
};

export default MathRenderer;

// Helper function
function parseMathString(input) {
  const cleaned = input.replace(/<\/?p>/g, "").replace(/&nbsp;/g, " ");
  return cleaned.split("$$").map((part, index) => ({
    type: index % 2 === 1 ? "math" : "text",
    value: part.trim(),
  }));
}
