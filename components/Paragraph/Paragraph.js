import { getTextAlign } from "utils/fonts";
import { relativeToAbsoluteUrls } from "utils/relativeToAbsoluteUrls";

export const Paragraph = ({ textAlign = "left", content, textColor }) => {
  return (
    <div className="core-paragraph">
      <div className="container">
        <p
          className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
          style={{ color: textColor }}
          dangerouslySetInnerHTML={{ __html: relativeToAbsoluteUrls(content) }}
        />
      </div>
    </div>
  );
};
