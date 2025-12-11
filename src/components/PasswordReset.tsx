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
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { NavLink } from "react-router";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function PasswordReset() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    form.reset();
  }

  function handleShowPassword() {
    setShowPassword(prev => !prev);
  }
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Create a new password</h2>
        <p className="font-light text-sm">
          Choose a strong password to secure your PrepLink account.
        </p>
      </div>
      <form
        id="form-password-reset"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px]"
      >
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password-reset">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  placeholder="Choose a new password"
                  aria-invalid={fieldState.invalid}
                  className="w-full max-w-[360px]"
                  type="password"
                  required
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-start"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-password-reset">Confirm Password</FieldLabel>
                <InputGroup>
                
                <InputGroupInput
                  {...field}
                  id="confirmPassword"
                  placeholder="Type it again to confirm"
                  aria-invalid={fieldState.invalid}
                  className="w-full max-w-[360px]"
                  type={showPassword?"text":"password"}
                  required
                  />
                  <InputGroupAddon align="inline-end" onClick={handleShowPassword} className="cursor-pointer">
                    {showPassword? <EyeIcon />:<EyeSlashIcon/>}
                  </InputGroupAddon>
                  </InputGroup>
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-start"
                  />
                )}
              </Field>
            )}
            
          />
          <Button className="cursor-pointer bg-[#5E2BFF] hover:bg-[#7247FF]">
            Continue
          </Button>
        </FieldGroup>
      </form>
      <Button variant={"ghost"} className="hover:bg-[#FEFFFE] cursor-pointer hover:underline mt-1"><NavLink to="/auth/login" className="cursor-pointer">Back to Login</NavLink></Button>
    </div>
  );
}
