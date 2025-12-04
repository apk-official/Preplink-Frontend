import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewQA from "./InterviewQA";
import type { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface InterviewPrepContentProp {
  id: number;
}

interface ProjectDetail {
  interview_questions: {
    question: string;
    answer: string;
    type: string;
  }[];
  interview_tips: string[];
  about_company: {
    about: string;
    vision: string;
    mission: string;
    additional: string;
  };
}

const TabItems = [
  {
    title: "Interview Q&A", 
    render: (detail: ProjectDetail) => (
      <InterviewQA questions={detail.interview_questions} />
    ),
  },
  {
    title: "Tips",
    render: (detail: ProjectDetail) => <div>{detail.interview_tips}</div>,
  },
  {
    title: "About the company",
    render: (detail: ProjectDetail) => <div>{detail.about_company.about}</div>,
  },
];

export default function InterviewPrepContent({ id }: InterviewPrepContentProp) {
  const ProjectDetail = useSelector(
    (state: RootState) => state.projectDetails[String(id)]
  );
  return (
    <div className="mt-4">
      <Tabs defaultValue="Interview Q&A" className="gap-3">
        <TabsList className="bg-0 gap-2">
          {TabItems.map((item) => (
            <TabsTrigger
              key={item.title}
              value={item.title}
              className="focus-visible:ring-0 focus-visible:outline-0 data-[state=active]:bg-[#5E2BFF] data-[state=active]:shadow-none data-[state=active]:font-normal data-[state=active]:border-0 data-[state=active]:text-[#FEFFFE] border border-[#131515] cursor-pointer transition-none text-xs md:text-sm font-light"
            >
              {item.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {TabItems.map((item) => (
          <TabsContent key={item.title} value={item.title}>
            {item.render(ProjectDetail)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
