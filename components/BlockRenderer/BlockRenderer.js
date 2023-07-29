import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
// import { PostTitle } from "components/PostTitle";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
          />
        );
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      // case "core/post-title": {
      //   return (
      //     <PostTitle
      //       key={block.id}
      //       level={block.attributes.level}
      //       textAlign={block.attributes.textAlign}
      //     />
      //   );
      // }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
  });
};
