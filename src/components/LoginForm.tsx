
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/g-logo.png";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"



export default function LoginForm() {
  const [checked,setChecked] = useState<boolean>(true)
  function handleSignIn() {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/google`;
  }
  function onCheckedChange(value: boolean | "indeterminate") {
    setChecked(value === true);
  }
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Log in to your account</h2>
        <p className="font-light text-sm">
          Welcome back! Continue your interview preparation journey.
        </p>
      </div>
      <Button className="w-full max-w-[360px] bg-[#131314] text-[#E3E3E3] cursor-pointer"  onClick={handleSignIn}  disabled={!checked}>
        {" "}
        <img src={googleIcon} className="w-4 h-auto"/>
        Sign in with Google
      </Button>
      <div className="flex items-center justify-center mt-4 gap-2 text-xs font-light">
        <Checkbox checked={checked} onCheckedChange={onCheckedChange}/>
         By continuing, you’re agreeing to PrepLink’s <a href="/privacy-policy" target="_blank" rel="noreferrer noopener" className="text-[#5E2BFF]">Privacy Policy.</a>
      </div>
    </div>
  );
}
