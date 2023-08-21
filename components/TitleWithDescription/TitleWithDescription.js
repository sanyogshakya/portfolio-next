import { relativeToAbsoluteUrls } from "@/utils/relativeToAbsoluteUrls";
import { Section } from "../Section/Section";

export const TitleWithDescription = ({ data }) => {
  data.description = data.description?.replaceAll(
    "<a",
    "<a class='font-extrabold text-white-100 hover:text-accent-200'"
  );
  return (
    <Section id={data.section_id}>
      <h3 className="mt-3 mb-8 lg:mb-10 text-4xl font-bold">{data.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: relativeToAbsoluteUrls(data.description),
        }}
      />
    </Section>
  );
};
