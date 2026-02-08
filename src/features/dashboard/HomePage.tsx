import CreatePrep from "@/components/CreatePrep";
import EmptyPrep from "@/components/EmptyPrep";
import PrepCard from "@/components/PrepCard";
import Sort from "@/components/Sort";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useState } from "react";
import EmptySearch from "@/components/EmptySearch";

export default function HomePage() {
  const projects = useSelector((state: RootState) => state.project);
  const [search, setSearch] = useState<string>("");
  console.log(projects);
  const filteredProjects = projects.filter((project) =>
    `${project.company} ${project.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const hasProjects = filteredProjects.length > 0;
  return (
    <>
      <h2 className="text-xl">My Prep</h2>

      {!projects && (
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
              {filteredProjects.length > 1 && <Sort />}
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
