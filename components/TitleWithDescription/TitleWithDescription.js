import { relativeToAbsoluteUrls } from "@/utils/relativeToAbsoluteUrls";

export const TitleWithDescription = ({ data }) => {
  data.description = data.description?.replaceAll(
    "<a",
    "<a class='font-extrabold text-white-100 hover:text-accent-200'"
  );
  return (
    <section id={data.section_id} className={`section pt-8 lg:pt-16`}>
      <h3 className="mt-3 mb-10 text-4xl font-bold">{data.title}</h3>
      <div
        dangerouslySetInnerHTML={{
          __html: relativeToAbsoluteUrls(data.description),
        }}
      />
    </section>
  );
};
