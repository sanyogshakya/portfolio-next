import { Project } from "@/components/ProjectsShowcase/Projects/Project";
import { getAllProjectsData } from "@/utils/getAllProjectsData";
import { notFound } from "next/navigation";

export const ProjectList = async () => {
  const { data: projData } = await getAllProjectsData();
  const allProjects = projData?.projects?.nodes;

  if (!allProjects) {
    return notFound();
  }

  return (
    <div className="flex flex-wrap -mx-3">
      {allProjects.map((project) => (
        <>
          <div className="lg:w-[calc(50%-1.5rem)] w-[calc(100%-1.5rem)] mx-3">
            <Project project={project} idx={project.id} />
          </div>
        </>
      ))}
    </div>
  );
};
