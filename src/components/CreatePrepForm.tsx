import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
  type ControllerRenderProps,
} from "react-hook-form";
import * as z from "zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { useRef, useState } from "react";
import {
  XCircleIcon,
  CheckCircleIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";

const formSchema = z.object({
  url: z
    .string({ message: "Company URL is required" })
    .min(1, "Company URL shouldn't be empty")
    .url("Please enter a valid URL (e.g., https://example.com)")
    .refine((url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === "https:";
      } catch {
        return false;
      }
    }, "Please use a secure URL starting with https://"),
  description: z
    .string({ message: "Job description is required" })
    .min(50, "Description should at least contain 50 characters"),
  resume: z
    .custom<File>((val) => val instanceof File, {
      message: "No resume/file has been uploaded",
    })
    .refine(
      (file) => file.size <= 1024 * 1024,
      "File size must be less than 1MB",
    )
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed",
    ),
});

export type CreatePrepValues = z.infer<typeof formSchema>;

export default function CreatePrepForm({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (
    data: CreatePrepValues,
    reset: () => void,
    clearFile: () => void,
  ) => void;
  isSubmitting: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      description: "",
      resume: undefined,
    },
  });
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof formSchema>>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      field.onChange(file);
    } else {
      setFileName(null);
    }
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleRemoveFile = (
    field: ControllerRenderProps<z.infer<typeof formSchema>>,
  ) => {
    setFileName(null);
    field.onChange(undefined);
  };
  const clearFile = () => setFileName(null);
  return (
    <form
      id="form-create-prep"
      onSubmit={form.handleSubmit((data) =>
        onSubmit(data, () => form.reset(), clearFile),
      )}
    >
      <FieldGroup className="gap-5">
        <Controller
          name="url"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="form-create-prep-url" className="mb-1">
                Company URL
              </FieldLabel>
              <Input
                {...field}
                id="form-create-prep-url"
                aria-invalid={fieldState.invalid}
                placeholder="https://example.com"
                autoComplete="off"
                className="placeholder:font-light"
                disabled={isSubmitting}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel
                htmlFor="form-create-prep-description"
                className="mb-1"
              >
                Job Description
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  {...field}
                  id="form-create-prep-description"
                  placeholder="We are looking for..."
                  rows={6}
                  className="max-h-24 resize-none placeholder:font-light overflow-scroll"
                  aria-invalid={fieldState.invalid}
                  disabled={isSubmitting}
                />
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* Resume  */}
        <Controller
          name="resume"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
              <FieldLabel htmlFor="form-create-prep-resume" className="mb-1">
                Resume
              </FieldLabel>
              {fileName ? (
                <div className="flex items-center justify-between gap-2 border border-input py-1 px-3 rounded-sm">
                  <div className="flex items-center justify-start gap-2">
                    <CheckCircleIcon size={20} color="#4BB543" weight="fill" />
                    <p className="text-sm w-[200px] truncate">{fileName}</p>
                  </div>

                  <Button
                    className="ps-0 has-[>svg]:px-0 py-0 bg-0 outline-none border-none focus-visible:ring-0 w-auto h-auto cursor-pointer hover:bg-0"
                    type="reset"
                    onClick={() => handleRemoveFile(field)}
                  >
                    <XCircleIcon className="h-5! w-5!" color="#131515" />
                  </Button>
                </div>
              ) : (
                <InputGroup className="focus-visible:ring-0 ">
                  <input
                    id="form-create-prep-resume"
                    ref={fileInputRef}
                    className="sr-only"
                    type="file"
                    accept="application/pdf"
                      onChange={(e) => handleFileChange(e, field)}
                      disabled={isSubmitting}
                  />
                  <InputGroupInput
                    readOnly
                    id="form-create-prep-resume"
                    className="focus-visible:ring-0"
                    placeholder={fileName ? fileName : "No file chosen"}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      onClick={handleClick}
                      variant="secondary"
                      className="bg-0 border border-[#5E2BFF] hover:bg-[#E9E5F6] bg-[#FEFEFE] text-[#5E2BFF] cursor-pointer font-light"
                    >
                      <UploadSimpleIcon /> Upload
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
