import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "./ui/button";
import { PlusIcon, RocketLaunchIcon } from "@phosphor-icons/react";
import CreatePrepForm from "./CreatePrepForm";

export default function CreatePrep() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5E2BFF] hover:bg-[#6E40FF] text-[#F5F5F5] text-xs md:text-sm cursor-pointer">
          <PlusIcon size={20} />
          Create Prep
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl justify-center px-4 md:px-8 w-full md:w-auto">
        <DialogHeader className="gap-1">
          <DialogTitle className="text-center font-normal text-xl">
            Let's Get You Hired
          </DialogTitle>
          <DialogDescription className="text-center">
            Get job-ready with tailored questions and expert answers.
          </DialogDescription>
        </DialogHeader>
        {/* Form Fields  */}
        <CreatePrepForm />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="form-create-prep"
                      className="bg-[#5E2BFF] hover:bg-[#6E40FF] text-[#F5F5F5] cursor-pointer"
                      disabled
          >
            {/* <RocketLaunchIcon /> */}
            <Spinner />
            Creating Prep
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
