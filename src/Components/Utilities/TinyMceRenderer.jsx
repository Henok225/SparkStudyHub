import React from "react";
import parse, { domToReact } from "html-react-parser";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

// Recursively replace math inside text nodes
const renderMathInText = (node) => {
  if (node.type === "text") {
    const text = node.data;
    const elements = [];
    let lastIndex = 0;

    // Match block $$...$$ or inline $...$
    const regex = /(\$\$([\s\S]+?)\$\$)|(\$([^\$]+?)\$)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before math
      if (match.index > lastIndex) {
        elements.push(text.slice(lastIndex, match.index));
      }

      if (match[1]) {
        // Block math
        elements.push(
          <BlockMath key={lastIndex} math={match[2].trim()} />
        );
      } else if (match[3]) {
        // Inline math
        elements.push(
          <InlineMath key={lastIndex} math={match[4].trim()} />
        );
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.slice(lastIndex));
    }

    return elements;
  }

  // If node has children, recurse
  if (node.children && node.children.length > 0) {
    return domToReact(node.children.map(renderMathInText));
  }

  return null;
};

const TinyMCEMathRenderer = ({ content }) => {
  return <div>{parse(content, { replace: renderMathInText })}</div>;
};

export default TinyMCEMathRenderer;
