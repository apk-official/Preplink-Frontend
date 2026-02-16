import CreatePrep from "@/components/CreatePrep";
import EmptyPrep from "@/components/EmptyPrep";
import PrepCard from "@/components/PrepCard";
import Sort from "@/components/Sort";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useMemo, useState } from "react";
import EmptySearch from "@/components/EmptySearch";

type SortOption = "NEWEST" | "OLDEST" | "NAME_AZ" | "NAME_ZA";


export default function HomePage() {
  const projects = useSelector((state: RootState) => state.project);
  const [search, setSearch] = useState<string>("");
  const [sortBy,setSortBy]=useState<SortOption>("NEWEST")
 

  const filteredProjects = useMemo(()=> {
    const filtered = projects.filter((project) =>
      `${project.company} ${project.position}`
        .toLowerCase()
        .includes(search.toLowerCase()));
      
    const sorted = [...filtered]
    sorted.sort((a, b) => {
      switch (sortBy) {
        case "NEWEST":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "OLDEST":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "NAME_AZ":
          return a.company.localeCompare(b.company);
        case "NAME_ZA":
          return b.company.localeCompare(a.company);
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

      {projects.length===0 && (
        <div className="h-full max-w-full flex items-center justify-center">
          <EmptyPrep />
        </div>
      )}

      {projects && (
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
                  key={project.id}
                  id={project.id}
                  company={project.company}
                  position={project.position}
                  date={project.date}
                />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
