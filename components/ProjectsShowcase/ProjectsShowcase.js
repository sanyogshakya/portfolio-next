"use client";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { relativeToAbsoluteUrls } from "@/utils/relativeToAbsoluteUrls";
import { getProjectShowcaseData } from "@/utils/getProjectData";
import { useState, useEffect } from "react";
import { Section } from "../Section/Section";

export const ProjectsShowcase = ({ data }) => {
  const [scrollUpImage, setScrollUpImage] = useState(null);
  const [scrollDownImage, setScrollDownImage] = useState(null);
  const [projectIdString, setProjectIdString] = useState("");
  const [projects, setProjects] = useState([]);

  let upInterval, downInterval;

  useEffect(() => {
    setProjectIdString(data?.projects?.toString());
    window.addEventListener("scroll", () => {
      clearInterval(upInterval);
      clearInterval(downInterval);
    });
  }, []);

  useEffect(() => {
    const getProjectData = async (projectIdString) => {
      const result = await getProjectShowcaseData(projectIdString);
      setProjects(result?.data?.projects?.nodes);
    };
    if (projectIdString) getProjectData(projectIdString);
  }, [projectIdString]);

  useEffect(() => {
    const scrollUp = () => {
      upInterval = setInterval(() => (scrollUpImage.scrollTop -= 1), 20);
    };

    const scrollDown = () => {
      downInterval = setInterval(() => (scrollDownImage.scrollTop += 1), 15);
    };

    if (scrollUpImage) {
      scrollUp();
    } else if (scrollDownImage) {
      scrollDown();
    }
  }, [scrollUpImage, scrollDownImage]);

  const imageScrollUpHandler = (e) => {
    setScrollUpImage(e.target.parentElement.querySelector("figure"));
  };

  const imageScrollDownHandler = (e) => {
    setScrollDownImage(e.target.parentElement.querySelector("figure"));
  };

  const stopScrollImage = () => {
    if (upInterval) clearInterval(upInterval);
    if (downInterval) clearInterval(downInterval);
    setScrollUpImage(null);
    setScrollDownImage(null);
  };

  return (
    <Section id={data.section_id}>
      <h3 className="mt-3 mb-8 text-4xl font-bold">{data.title}</h3>
      {projects &&
        projects.map((project, idx) => (
          <Link
            key={idx}
            href={project?.customFieldsProjects?.projectUrl || "#"}
            target="_blank"
            className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row hover:bg-accent-100/5 p-3 sm:p-4 rounded -ml-3 -mr-3 sm:-ml-4 sm:-mr-4 mb-4"
          >
            <div className="relative shadow-xl md:w-1/2 lg:w-full xl:w-2/5 h-[100%] p-1 rounded-md backdrop-blur-sm bg-accent-200/10 mb-4 xl:mt-1">
              <span
                className="absolute top-0 left-0 w-full h-[40%]"
                onMouseEnter={(e) => imageScrollUpHandler(e)}
                onMouseLeave={(e) => stopScrollImage(e)}
              ></span>
              <figure className={`w-full aspect-video overflow-hidden rounded`}>
                <Image
                  src={project.featuredImage.node.sourceUrl}
                  width={375}
                  height={1545}
                  alt={project.featuredImage.node.title}
                  className={`w-full object-cover`}
                ></Image>
              </figure>
              <span
                className="absolute bottom-0 left-0 w-full h-[40%]"
                onMouseEnter={(e) => imageScrollDownHandler(e)}
                onMouseLeave={() => stopScrollImage()}
              ></span>
            </div>
            <div className="project-text md:w-1/2 lg:w-full xl:w-3/5 sm:pl-4 lg:pl-0 xl:pl-4">
              <div className="flex group-hover:text-accent-200">
                <h4 className="inline-block mb-2 text-lg font-semibold">
                  {project.title}
                </h4>
                <span>
                  <FaArrowUpRightFromSquare className="shrink-0 mx-2 my-1" />
                </span>
              </div>
              <div
                className={`mb-3`}
                dangerouslySetInnerHTML={{
                  __html: relativeToAbsoluteUrls(project.excerpt),
                }}
              />
              {project?.customFieldsProjects?.technologies && (
                <ul className="flex flex-wrap -m-2" aria-label="Tools used:">
                  {project?.customFieldsProjects?.technologies &&
                    project?.customFieldsProjects?.technologies.map(
                      (technologyItem, idx) => (
                        <li key={idx} className="p-2">
                          <div className="px-3 py-1 bg-accent-200/10 rounded-md text-accent-200 text-xs font-semibold">
                            {technologyItem.technology}
                          </div>
                        </li>
                      )
                    )}
                </ul>
              )}
            </div>
          </Link>
        ))}
    </Section>
  );
};
