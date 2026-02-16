import { Badge } from "@/components/ui/badge";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";

interface AboutCompany {
  about: string;
  about_url: string;
  vision: string;
  vision_url: string;
  mission: string;
  mission_url: string;
  additional: string;
  additional_url: string;
}

interface AboutCompanyProps {
  about_company: AboutCompany;
}

export default function AboutCompany({ about_company }: AboutCompanyProps) {
  const sections = [
    {
      label: "About",
      content: about_company.about,
      url: about_company.about_url,
      badgeColor: "bg-[#2BBCFF]",
    },
    {
      label: "Vision",
      content: about_company.vision,
      url: about_company.vision_url,
      badgeColor: "bg-[#2CB905]",
    },
    {
      label: "Mission",
      content: about_company.mission,
      url: about_company.mission_url,
      badgeColor: "bg-[#FFBC2B]",
    },
    {
      label: "Additional",
      content: about_company.additional,
      url: about_company.additional_url,
      badgeColor: "bg-[#C70CDC]",
    },
  ];
  return (
    <div className="w-full md:w-1/2  flex flex-col  gap-4">
      {sections.map((section,index)=>(<div key={index} className="border rounded-lg p-2 text-sm flex flex-col items-start justify-start gap-2"><Badge className={`${section.badgeColor} text-[#FEFFFE]`}>{section.label}</Badge>
      {section.content}
      <a
              href={about_company.mission_url}
              target="_blank"
              rel="noopener noreferrer"
        className="border border-[#5E2BFF] py-1 px-4 rounded-2xl text-xs text-[#5E2BFF] flex items-center justify-center gap-1"
      >
        {section.url}
        <ArrowSquareOutIcon weight="bold" />
      </a></div>))}
    </div>
  );
}
