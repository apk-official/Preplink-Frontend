import CreatePrep from "@/components/CreatePrep";
import EmptyPrep from "@/components/EmptyPrep";
import PrepCard from "@/components/PrepCard";
import Sort from "@/components/Sort";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import EmptySearch from "@/components/EmptySearch";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchProjects } from "@/redux/slices/projectSlice";
import { formatDate } from "@/lib/date";

type SortOption = "NEWEST" | "OLDEST" | "NAME_AZ" | "NAME_ZA";


export default function HomePage() {
  const dispatch = useAppDispatch();
  const { items: projects, status } = useAppSelector(
    (state) => state.project
  );


  const [search, setSearch] = useState<string>("");
  const [sortBy,setSortBy]=useState<SortOption>("NEWEST")
 
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [status, dispatch]);

  const filteredProjects = useMemo(()=> {
    const filtered = projects.filter((project) =>
      `${project.company_name} ${project.position}`
        .toLowerCase()
        .includes(search.toLowerCase()));
      
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      switch (sortBy) {
        case "NEWEST":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "OLDEST":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "NAME_AZ":
          return a.company_name.localeCompare(b.company_name);
        case "NAME_ZA":
          return b.company_name.localeCompare(a.company_name);
        default:
          return 0;
      }
    });
    return sorted;
    
    },[projects,search,sortBy]);

  const hasProjects = filteredProjects.length > 0;
  return (
    <>
      <h2 className="text-xl">My Prep</h2>

      {status === "ready" && projects.length===0 && (
        <div className="h-full max-w-full flex items-center justify-center">
          <EmptyPrep />
        </div>
      )}

      {status === "ready" && projects.length > 0 && (
        <>
          <div className="flex w-full items-center justify-between pt-4 gap-1">
            <div className="flex items-center justify-center gap-1 px-2 py-1 bg-[#F1EDFE] max-w-[232px] rounded-lg">
              <MagnifyingGlassIcon size={20} color="#B69FFE" />
              <Input
                type="text"
                name="search"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
                className="outline-none border-none bg-none focus-visible:ring-0 shadow-none p-0 h-7 text-xs md:text-sm placeholder:text-[#B69FFE] text-[#5E2BFF] caret-[#5E2BFF]"
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              {filteredProjects.length > 1 && <Sort value={sortBy} onChange={setSortBy}/>}
              <CreatePrep />
            </div>
          </div>
          {!hasProjects && (
            <div className="max-h-full min-h-[60vh] flex items-center justify-center">
              <EmptySearch />
            </div>
          )}
          {hasProjects && (
            <div className="max-w-full max-h-full grid grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4 pt-4">
              {filteredProjects.map((project) => (
                <PrepCard
                  key={project.project_id}
                  id={project.project_id}
                  company={project.company_name}
                  position={project.position}
                  date={formatDate(project.created_at, "DD-MM-YYYY")}
                  img_url = {project.company_logo}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
