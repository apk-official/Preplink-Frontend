import CreatePrep from "./CreatePrep";
import emptyStateImg from "@/assets/empty-illustration-home.svg"


export default function EmptyPrep() {
  return (
      <div className="flex flex-col gap-4 items-center justify-center">
          <img src={emptyStateImg} alt="Empty state illustration of a man in front of his laptop" />
          <p className="text-center font-light">Don’t think too long, Start prepare for your interview now</p>
          <CreatePrep/>
    </div>
  )
}
