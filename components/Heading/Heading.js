import React from "react";
import { getFontSizeForHeading, getTextAlign } from "utils/fonts";

export const Heading = ({ textAlign, content, level }) => {
  const tag = React.createElement(`h${level}`, {
    dangerouslySetInnerHTML: { __html: content },
    className: `${getFontSizeForHeading(level)} ${getTextAlign(textAlign)}`,
  });
  return (
    <div className="core-heading">
      <div className="container">{tag}</div>
    </div>
  );
};
