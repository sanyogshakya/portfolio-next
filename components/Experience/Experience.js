import Link from "next/link";
import { relativeToAbsoluteUrls } from "@/utils/relativeToAbsoluteUrls";
import { ExternalLink } from "../ExternalLink/ExternalLink";

export const Experience = ({ data }) => {
  const experienceCount = data.experience_list || 0;
  const experienceIdxArray = [...Array(experienceCount)];
  const repeaterSlug = "experience_list";
  const resume = data.resume?.url;
  return (
    <section id={data.section_id} className={`section pt-8 lg:pt-16`}>
      <h3 className="mt-3 mb-10 text-4xl font-bold">{data.title}</h3>
      {experienceCount > 0 && (
        <ul className="experience-list">
          {experienceIdxArray.map((_, index) => {
            const jobTitle = `${repeaterSlug}_${index}_job_title`;
            const otherDesignations = `${repeaterSlug}_${index}_other_designations`;
            const jobOrganization = `${repeaterSlug}_${index}_organization`;
            const jobDuration = `${repeaterSlug}_${index}_duration`;
            const jobDescription = `${repeaterSlug}_${index}_description`;

            const otherDesignationCount = data[otherDesignations] || 0;
            const otherDesignationIdxArray = [...Array(experienceCount)];
            const desigRepeaterSlug = "other_designations";

            return (
              <li key={index} className="experience-item pb-8">
                <h4 className="title text-xl font-bold text-white-200 mb-1">
                  {data[jobTitle]} --{" "}
                  {data[jobOrganization] &&
                    (data[jobOrganization].url !== "#" ? (
                      <Link
                        target={data[jobOrganization]?.target}
                        href={data[jobOrganization].url}
                      >
                        {data[jobOrganization].title}
                      </Link>
                    ) : (
                      data[jobOrganization].title
                    ))}
                </h4>
                {otherDesignationCount > 0 &&
                  otherDesignationIdxArray.map((_, desigIdx) => {
                    const designation = `${repeaterSlug}_${index}_${desigRepeaterSlug}_${desigIdx}_designation`;
                    return (
                      <div key={desigIdx} className="text-white-300">
                        {data[designation]}
                      </div>
                    );
                  })}
                <h6 className="text-sm text-white-500 font-medium mb-3 mt-2">
                  {data[jobDuration]}
                </h6>
                <div
                  dangerouslySetInnerHTML={{
                    __html: relativeToAbsoluteUrls(data[jobDescription]),
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
      {resume && <ExternalLink title="View My Resume" href={resume} />}
    </section>
  );
};
