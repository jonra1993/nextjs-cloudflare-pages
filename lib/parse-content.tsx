import React from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import sanitizeHtml from 'sanitize-html';

type ParseContentProps = { content: string };

export const ParseContent: React.FC<ParseContentProps> = ({ content }) => {
    console.log("content", content);
    const html: string = "<h1>hello world</h1>";
    const sanitizedContent = sanitizeHtml(content);
    console.log("sanitizedContent", sanitizedContent);
    return (
        <div>{content && parse(sanitizedContent)}</div>
    );
};
