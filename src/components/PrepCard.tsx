import { useNavigate } from "react-router";
import PrepCardDropdown from "./PrepCardDropdown";
import { useAppDispatch } from "@/redux/hooks"
import { setActiveItem } from "@/redux/slices/menuSlice";

interface PrepCardProps {
  id: number;
  company: string;
  position: string;
  date: string;
  img_url: string;
}
/**
 * Renders PrepCards which include companies Data
 *
 * @remarks
 * This is a responsive component, works on both Desktop and Mobile
 * It shows Company Logo, List of Menu Items, Avatar and Mobile menu toggle
 *
 * @returns
 * A card component which contain company name, Logo, Applied role, created date and time
 *
 */
export default function PrepCard({ id,company, position, date, img_url }: PrepCardProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  function handleSelect() {
    navigate(`/project/${id}`)
    dispatch(setActiveItem('/project'))
  }

  return (
    <div
      className="bg-[#FEFFFE] border border-[#E5E5E5] hover:border-[#5E2BFF] w-full hover:shadow-[0_4px_15px_rgba(227,227,227,0.5)] rounded-3xl p-4 flex flex-col justify-center items-center cursor-pointer z-0"
      onClick={handleSelect}
    >
      {/* Row 1 - Company Logo and Arrow Button  */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#F5F5F5]">
          <img src={img_url} alt="Company Img" className="object-cover"/>
        </div>
        <PrepCardDropdown />
      </div>
      {/* Row 2 - Company name and Applied Position  */}
      <div className="w-full flex flex-col items-start justify-between mt-2 mb-2">
        <p className="text-sm font-medium text-[#5E2BFF]">{company}</p>
        <p className="text-xs font-light text-[#555555]">{position}</p>
      </div>
      {/* Row 3 - Prep Created date and time  */}
      <div className="w-full flex flex-col items-start justify-between">
        <p className="text-xs md:text-sm font-normal text-[#131515]">{date}</p>
      </div>
    </div>
  );
}
