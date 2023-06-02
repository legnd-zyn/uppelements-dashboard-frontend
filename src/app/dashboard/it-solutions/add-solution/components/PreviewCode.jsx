import ReactMarkdown from "react-markdown";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import remarkSlug from "remark-slug";
import remarkAutolinkHeadings from "remark-autolink-headings";
import React from "react";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);

function flatten(text, child) {
  return typeof child === "string"
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  var children = React.Children.toArray(props.children);
  var text = children.reduce(flatten, "");
  var slug = text.toLowerCase().replace(/\W/g, "-");
  return React.createElement("h" + props.level, { id: slug }, props.children);
}

const renderCodeBlock = (props) => {
  const { children, className } = props;

  if (className) {
    // Extract the language from the className prop
    const language = className.replace("language-", "");

    return (
      <SyntaxHighlighter language={language} style={oneDark}>
        {children}
      </SyntaxHighlighter>
    );
  }

  // If className is not provided, render the code as-is
  return <code>{children}</code>;
};

export default function MarkdownPreview({ markdownContent }) {
  return (
    <ReactMarkdown
      components={{ code: renderCodeBlock, Heading: HeadingRenderer }}
      remarkPlugins={[
        remarkSlug,
        [remarkAutolinkHeadings, { behavior: "wrap" }],
      ]}
      children={markdownContent}
      allowElement={(node) => node.type !== "html"} // Exclude raw HTML elements from generating IDs
    />
  );
}
