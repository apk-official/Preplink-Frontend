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
import { NavLink } from "react-router";
import { useEffect, useState } from "react";


const formSchema = z
  .object({
  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only numbers"),
});
export default function OTPForm() {
  const [seconds, setSeconds] = useState<number>(30)
  const [canResendOTP, setCanResendOTP] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 0) {
      setCanResendOTP(true);
      return
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000);

    return () => clearInterval(timer)
  }, [seconds]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    form.reset();
  }
  function handleResendOTP(e:React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    setSeconds(30);
    setCanResendOTP(false);
  }
  const formattedTime = `00:${seconds.toString().padStart(2,"0")}`

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Check your inbox</h2>
        <p className="font-light text-sm w-full max-w-[360px]">
          We’ve sent a 6-digit code to your email. Enter it below to verify your
          identity.
        </p>
      </div>
      <form
        id="form-otp"
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-[360px]"
      >
        <FieldGroup>
          <Controller
            name="otp"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-otp">OTP</FieldLabel>
                <Input
                  {...field}
                  id="otp"
                  placeholder="Enter 6-digit code"
                  aria-invalid={fieldState.invalid}
                  className="w-full max-w-[360px]"
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
          <div className="flex flex-col">
            <Button className="cursor-pointer bg-[#5E2BFF] hover:bg-[#7247FF]">
            Continue
            </Button>
            <div className="flex justify-between items-center">
              <p>{formattedTime}</p>
              {/* OTP Resend Button  */}
              {canResendOTP?<Button variant={"ghost"} className="text-[#5E2BFF] font-medium hover:bg-0 hover:underline cursor-pointer hover:text-[#5E2BFF]" onClick={(e)=>handleResendOTP(e)}> 
            Resent OTP
            </Button>:<Button variant={"ghost"} disabled> 
            Resent OTP
            </Button>}
            </div>
          </div>
          
        </FieldGroup>
      </form>
     <Button variant={"ghost"} className="hover:bg-[#FEFFFE] cursor-pointer hover:underline mt-1"><NavLink to="/auth/login" className="cursor-pointer">Back to Login</NavLink></Button>
    </div>
  );
}
