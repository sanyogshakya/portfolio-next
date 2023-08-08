import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { TitleWithDescription } from "../TitleWithDescription";
import { Experience } from "../Experience";
import { ProjectsShowcase } from "../ProjectsShowcase";
import { ContactForm } from "../ContactForm";

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
      case "acf/sanyog-title-with-description": {
        return (
          <TitleWithDescription key={block.id} data={block.attributes.data} />
        );
      }
      case "acf/sanyog-experience": {
        return <Experience key={block.id} data={block.attributes.data} />;
      }
      case "acf/sanyog-projects-showcase": {
        return <ProjectsShowcase key={block.id} data={block.attributes.data} />;
      }
      case "acf/sanyog-contact-form": {
        return <ContactForm key={block.id} data={block.attributes.data} />;
      }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
  });
};
