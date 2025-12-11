import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { NavLink } from "react-router";
import googleIcon from "@/assets/g-logo.png";

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

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form Submitted:", data);
    form.reset();
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Log in to your account</h2>
        <p className="font-light text-sm">
          Welcome back! Continue your interview preparation journey.
        </p>
      </div>
      <Button className="w-full max-w-[360px] bg-[#131314] text-[#E3E3E3] cursor-pointer">
        {" "}
        <img src={googleIcon} className="w-4 h-auto" />
        Sign in with Google
      </Button>
      <p className="my-4">or</p>
      <form
        id="form-log-in"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px] space-y-4"
      >
        <FieldSet>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="text-start gap-1"
                >
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    type="text"
                    placeholder="example@company.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="text-start gap-1">
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="•••••••"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <NavLink
            to="/auth/forgot-password"
            className="text-end text-sm font-medium text-[#131515] hover:underline"
          >
            Forgot Password?
          </NavLink>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full max-w-[360px] self-center cursor-pointer bg-[#5E2BFF] hover:bg-[#7247FF]"
              type="submit"
            >
              Log In
            </Button>
            <p className="font-light text-sm">
              By continuing, you agree to our <NavLink to="" className="underline">T&C</NavLink>  and <NavLink to="" className="underline">Privacy Policy</NavLink>
            </p>
          </div>

          <p className="text-sm text-[#444B4B]">
            New to PrepLink?{" "}
            <NavLink
              to=""
              className="font-semibold text-[#131515] hover:underline"
            >
              Register into wishlist
            </NavLink>
          </p>
        </FieldSet>
      </form>
    </div>
  );
}
