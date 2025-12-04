import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import InterviewItemIcon from "@/assets/item-icon.svg";

interface InterviewQAProps {
  questions: Question[];
}
interface Question {
  question: string;
  answer: string;
  type: string;
}

export default function InterviewQA({ questions }: InterviewQAProps) {
  const groupedQuestions = questions.reduce((acc, q) => {
    if (!acc[q.type]) {
      acc[q.type] = [];
    }
    acc[q.type].push(q);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <>
      {Object.entries(groupedQuestions).map(([type, question]) => (
        <div key={type}>
          <p className="text-xs font-medium text-gray-800 mt-3">{type}</p>
          <Accordion type="single" collapsible className="lg:w-1/2">
            {question.map((q, index) => (
              <AccordionItem
                key={`${type}-${index}`}
                value={`${type}-${index}`}
                className="border-none"
              >
                <AccordionTrigger>
                  <span className="flex items-center gap-1 ">
                    <img
                      src={InterviewItemIcon}
                      alt="A gradient asterisk icon representing interview item"
                      className="w-4 h-4"
                    />
                    {q.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p>{q.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </>
  );
}
