import { getProjectShowcaseData } from "@/utils/getProjectsShowcaseData";
import { Project } from "./Project/Project";

export const Projects = async ({ projectIdsString }) => {
  const result = await getProjectShowcaseData(projectIdsString);
  const projects = result?.data?.projects?.nodes;
  return (
    <>
      {projects &&
        projects.map((project, idx) => <Project project={project} key={idx} />)}
    </>
  );
};
