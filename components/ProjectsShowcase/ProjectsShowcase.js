"use client";
import useSWR from "swr";
import { request } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { relativeToAbsoluteUrls } from "@/utils/relativeToAbsoluteUrls";
import { useCallback, useEffect, useRef, useState } from "react";

const fetcher = (query) =>
  request(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, query);

export const ProjectsShowcase = ({ data }) => {
  const [scrollUpImage, setScrollUpImage] = useState(null);
  const [scrollDownImage, setScrollDownImage] = useState(null);

  let upInterval, downInterval;

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

  window.addEventListener("scroll", () => {
    clearInterval(upInterval);
    clearInterval(downInterval);
  });

  const projectIdString = data?.projects?.toString() || "";

  const { data: projectsData } = useSWR(
    `{
      projects(where: { in: [${projectIdString}] }) {
        nodes {
          title
          excerpt
          featuredImage {
            node {
              title
              sourceUrl
            }
          }
          customFieldsProjects {
            projectUrl
            technologies {
              technology
            }
          }
        }
      }
    }`,
    fetcher
  );

  const projects = projectsData?.projects?.nodes;

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
    <section id="projects" className={`section pt-8 lg:pt-16`}>
      <h3 className="mt-3 mb-6 text-4xl font-bold">{data.title}</h3>
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
                  width={450}
                  height={300}
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
    </section>
  );
};
