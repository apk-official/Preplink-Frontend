import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const disposableDomains = [
  "mailinator.com",
  "tempmail.com",
  "tempmail.dev",
  "10minutemail.com",
  "throwawaymail.com",
  "guerrillamail.com",
  "fakeinbox.com",
  "trashmail.com",
  "yopmail.com",
];

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .refine((email) => {
      const domain = email.split("@")[1];
      return !disposableDomains.includes(domain);
    }, "Temporary or disposable emails are not allowed"),
});

export default function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    form.reset();
  }
  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Forgot your password?</h2>
        <p className="font-light text-sm">
          Enter your email address and we’ll send you a verification code to
          reset it.
        </p>
      </div>
      <form
        id="form-create-prep"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px]"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  placeholder="example@company.com"
                  aria-invalid={fieldState.invalid}
                  className="w-full max-w-[360px]"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-start"/>
                )}
                <Button className="cursor-pointer bg-[#5E2BFF] hover:bg-[#7247FF]">
                  Continue
                </Button>
              </Field>
            )}
          />
        </FieldGroup>
          </form>
          <Button variant={"ghost"} className="hover:bg-[#FEFFFE] cursor-pointer hover:underline">Back to Login</Button>
    </div>
  );
}
