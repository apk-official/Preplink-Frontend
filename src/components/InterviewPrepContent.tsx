import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InterviewQA from "./InterviewQA";
import InterviewTips from "./InterviewTips";
import AboutCompany from "./AboutCompany";
import { useAppSelector } from "@/redux/hooks";

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
    about_url: string;
    vision: string;
    vision_url: string;
    mission: string;
    mission_url: string;
    additional: string;
    additional_url: string;
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
    render: (detail: ProjectDetail) => (
      <InterviewTips tips={detail.interview_tips} />
    ),
  },
  {
    title: "About the company",
    render: (detail: ProjectDetail) => (
      <AboutCompany about_company={detail.about_company} />
    ),
  },
];

export default function InterviewPrepContent({ id }: InterviewPrepContentProp) {
  const detail = useAppSelector((state) => state.projectDetails.byId[id]);
  const status = useAppSelector(
    (state) => state.projectDetails.statusById[id] ?? "idle",
  );

  if (status === "loading") return <div className="mt-4 text-sm">Loading…</div>;
  if (!detail) return null;

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
            {item.render(detail)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
