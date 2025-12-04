import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { NavLink } from "react-router"
import { useAppDispatch } from "@/redux/hooks"
import { setActiveItem } from "@/redux/slices/menuSlice"

interface ProjectPathProps{
    company:string
}

export default function ProjectPath({ company }: ProjectPathProps) {
    const dispatch = useAppDispatch();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-[#5E2BFF]">
            <NavLink to="/" onClick={()=>dispatch(setActiveItem("/"))}>Home</NavLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          /
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#5E2BFF] font-medium">{company}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )

}
