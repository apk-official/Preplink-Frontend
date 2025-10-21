import { ArrowRightIcon } from "@phosphor-icons/react";

export default function HomePage() {
  return (
    <div className="pt-6">
      <h2 className="text-xl">My Prep</h2>
      <div className="max-w-full min-h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {/* ------------------------- */}
        {/* Individual Preps (Cards)  */}
        {/* ------------------------- */}
        <div className="bg-[#FEFFFE] w-full shadow-[0_4px_15px_rgba(227,227,227,0.5)] rounded-3xl p-3 flex flex-col justify-center items-center">
          {/* Row 1 - Company Logo and Arrow Button  */}
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#F5F5F5]">
              D
            </div>
            <button className="flex items-center justify-center w-11 h-11 rounded-full outline outline-[#9FA8A8] cursor-pointer">
              <ArrowRightIcon size={24} weight="light" />
            </button>
          </div>
          {/* Row 2 - Company name and Applied Position  */}
          <div className="w-full flex flex-col items-start justify-between mt-2 mb-12">
            <p className="text-sm font-medium text-[#131515]">
              De'Lead International
            </p>
            <p className="text-xs font-light text-[#555555]">
              Software Developer
            </p>
          </div>
          {/* Row 3 - Prep Created date and time  */}
          <div className="w-full flex flex-col items-start justify-between mb-2">
            <p className="text-sm font-normal text-[#131515]">
              20 Sep 2025 - 1:30pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
