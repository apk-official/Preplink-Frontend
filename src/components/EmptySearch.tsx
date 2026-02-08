import emptySearchImg from "@/assets/No project.svg"


export default function EmptySearch() {
  return (
      <div className="flex flex-col gap-4 items-center justify-center">
          <img src={emptySearchImg} className="w-36" alt="Empty state illustration of a man in front of his laptop" />
          <p className="text-center font-light">We couldn’t find a prep that matches your search.</p>
    </div>
  )
}
