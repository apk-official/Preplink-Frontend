import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProjectPath from "./ProjectPath";
import InterviewPrepContent from "./InterviewPrepContent";

export default function ProjectDetails() {
  const { id } = useParams<{id:string}>();
  const projectId = Number(id);
  const project = useSelector((state: RootState) =>
    state.project.find((p) => p.id === projectId)
  );
  
  if (!project) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold mb-2">
          Hmm… we’re having trouble loading this project right now.
        </h2>
        <p>Refresh the page or try again later.</p>
      </div>
    );
  }
  return (
    <>
      <ProjectPath company={project.company} />
      <p className="text-base md:text-lg lg:text-xl font-medium text-[#131515] mt-2">{project.company}<span className="text-xs md:text-sm lg:text-base font-light text-[#131515]"> ({project.position})</span></p>
      <p className="text-xs md:text-sm font-light">Created on {project.date} {project.time}</p>
      <InterviewPrepContent id={projectId } />
    </>
  );
}
