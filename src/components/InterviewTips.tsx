import StarImg from "../assets/item-icon.svg"
interface InterviewTipsProps {
  tips: string[];
}

export default function InterviewTips({ tips }: InterviewTipsProps) {
  return (
    <div className="flex flex-col gap-3">
      {tips.map((tip, index) => (
        <div key={index} className="w-full md:w-1/2 border rounded-lg p-2 text-sm flex items-start justify-start gap-2"><img src={StarImg} alt="image of a asterisk inside a circle for representing tip item" className="w-4 h-auto float" />{tip}</div>
      ))}
    </div>
  );
}
