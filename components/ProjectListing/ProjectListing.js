import { getAllProjectsData } from "@/utils/getAllProjectsData";
import { ProjectList } from "./ProjectList/ProjectList";
import { BackwardLink } from "../Link/BackwardLink/BackwardLink";

export const ProjectListing = ({ data }) => {
  const title = data?.title ? data.title : "All Projects";
  return (
    <div>
      <nav>
        <BackwardLink href="/" title="Sanyog Shakya" />
      </nav>
      <h1 className="mt-3 mb-8 lg:mb-10 text-4xl font-bold">{title}</h1>
      <ProjectList />
    </div>
  );
};
