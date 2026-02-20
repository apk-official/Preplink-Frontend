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
// import { Spinner } from "@/components/ui/spinner";
import { Button } from "./ui/button";
import { PlusIcon, RocketLaunchIcon } from "@phosphor-icons/react";
import CreatePrepForm, { type CreatePrepValues } from "./CreatePrepForm";
import { useNavigate } from "react-router";
import { useState } from "react";
import CreatePrepLoading from "./CreatePrepLoading";
import { apiFetch } from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { fetchProjects } from "@/redux/slices/projectSlice";

export default function CreatePrep() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleCreatePrep(
    data: CreatePrepValues,
    reset: () => void,
    clearFile: () => void,
  ) {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("url", data.url);
      formData.append("job_desc", data.description);
      formData.append("resume", data.resume);

      const res = await apiFetch("/api/v1/prep", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to create prep");
      }

      const json = await res.json();
      const newId = json.project_id ?? json.id;

      if (!newId) throw new Error("Backend did not return project id");

      // ✅ Refresh list
      await dispatch(fetchProjects());

      // Navigate to project page
      navigate(`/project/${newId}`);

      reset();
      clearFile();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        {isLoading ? (
          <CreatePrepLoading />
        ) : (
          <CreatePrepForm
            onSubmit={handleCreatePrep}
            isSubmitting={isLoading}
          />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            form="form-create-prep"
            className="bg-[#5E2BFF] hover:bg-[#6E40FF] text-[#F5F5F5] cursor-pointer"
            disabled={isLoading}
          >
            <RocketLaunchIcon />
            {/* <Spinner /> */}
            {isLoading ? "Creating..." : "Create Prep"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
