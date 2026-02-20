
import { useParams } from "react-router";
import ProjectPath from "./ProjectPath";
import InterviewPrepContent from "./InterviewPrepContent";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { fetchProjectDetails } from "@/redux/slices/projectDetailsSlice";
import { formatDate } from "@/lib/date";

export default function ProjectDetails() {
  const { id } = useParams<{id:string}>();
  const projectId = Number(id);
  
  const dispatch = useAppDispatch();

  // ✅ project list comes from state.project.items
  const project = useAppSelector((state) =>
    state.project.items.find((p) => p.project_id === projectId)
  );

  // ✅ project details fetched by id
  const detail = useAppSelector((state) => state.projectDetails.byId[projectId]);
  const status = useAppSelector(
    (state) => state.projectDetails.statusById[projectId] ?? "idle"
  );
  const error = useAppSelector((state) => state.projectDetails.errorById[projectId]);

  useEffect(() => {
    if (!Number.isFinite(projectId)) return;
    if (!detail && status === "idle") {
      dispatch(fetchProjectDetails(projectId));
    }
  }, [projectId, detail, status, dispatch]);


 // If project meta not in list (user refreshes directly), you can still show detail tabs,
  // but at least show a fallback heading.
  if (!project && status === "loading") {
    return <div className="p-6 text-sm">Loading project…</div>;
  }

  if (status === "error") {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <h2 className="text-xl font-semibold mb-2">
          Hmm… we’re having trouble loading this project right now.
        </h2>
        <p>{error ?? "Refresh the page or try again later."}</p>
      </div>
    );
  }
  return (
    <>
      <ProjectPath company={project?.company_name ?? "Project"} />

      <p className="text-base md:text-lg lg:text-xl font-medium text-[#131515] mt-2">
        {project?.company_name ?? "Project"}
        {project?.position && (
          <span className="text-xs md:text-sm lg:text-base font-light text-[#131515]">
            {" "}
            ({project.position})
          </span>
        )}
      </p>

      {project?.created_at && (
        <p className="text-xs md:text-sm font-light">
          Created on {formatDate(project.created_at, "DD MMM YYYY")} {formatDate(project.created_at)}
        </p>
      )}

      {/* ✅ render tabs only when details exist */}
      {status === "loading" && <div className="mt-4 text-sm">Loading details…</div>}
      {detail && <InterviewPrepContent id={projectId} />}
    </>
  );
}
