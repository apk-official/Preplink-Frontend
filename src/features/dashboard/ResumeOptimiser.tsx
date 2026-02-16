import ComingSoon from "@/assets/ComingSoon.svg"
export default function ResumeOptimiser() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-full">
      <img src={ComingSoon} alt="Image of a Person sitting infront of a computer doing coding" className="w-65 h-auto"/>
          <h2 className="font-semibold text-[#5E2BFF]">We’re Working on It</h2>
          <p className=" text-center align-center text-sm">This feature isn’t available yet, but we’re building it and it’s coming soon!</p>
    </div>
  )
}
