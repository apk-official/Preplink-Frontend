import { Button } from "./ui/button";
import { useState } from "react";
import { InfoIcon } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";
 interface InterviewQAProps {
  questions?: Question[];
}
interface Question {
  question: string;
  answer: string;
  type: string;
}

export default function InterviewQA({ questions }: InterviewQAProps) {
  const groupedQuestions = (questions ?? []).reduce((acc, q) => {
    if (!acc[q.type]) acc[q.type] = [];
    acc[q.type].push(q);
    return acc;
  }, {} as Record<string, Question[]>);
  const [showAnswer, setShowAnswer] = useState<boolean>(true);

  function handleShowAnswer() {
    setShowAnswer((prev) => !prev);
  }
  console.log("questions", questions);
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center md:justify-center gap-2">
        <div className="text-xs bg-[#FEF2C2] border border-[#FDD535] rounded-lg flex-1 px-2 py-1 flex items-center justify-baseline gap-2 break-words whitespace-pre-wrap text-[#A28202] align-center">
          <InfoIcon size={20} /> AI-generated answers may contain errors, review
          and personalise before use.
        </div>
        <Button
          variant="ghost"
          className="text-xs px-0 py-0 md:px-2 md:py-0.5 hover:bg-[#F0EBFF] text-[#5E2BFF]  flex items-center justify-center cursor-pointer outline-none border-none shadow-none underline"
          onClick={handleShowAnswer}
        >
          {!showAnswer ? "Show answers" : "Hide answers"}
        </Button>
      </div>

      {Object.entries(groupedQuestions).map(([type, question]) => (
        <div key={type}>
          <p className="text-sm font-medium text-[#5E2BFF] my-3">{type}</p>
          <Separator />
          <div className="flex flex-col items-start justify-center gap-2">
            {question.map((q) => (
              <div className="w-full">
                <p className="text-sm font-medium text-[#131515]">
                  Q. {q.question}
                </p>
                {showAnswer && (
                  <div className="text-sm p-2 break-words whitespace-pre-wrap max-w-full w-full text-[#303636]">
                    {q.answer}
                  </div>
                )}
                <Separator />
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
