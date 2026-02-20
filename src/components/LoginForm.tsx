
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/g-logo.png";




export default function LoginForm() {
  function handleSignIn() {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/google`;
  }
  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-semibold">Log in to your account</h2>
        <p className="font-light text-sm">
          Welcome back! Continue your interview preparation journey.
        </p>
      </div>
      <Button className="w-full max-w-[360px] bg-[#131314] text-[#E3E3E3] cursor-pointer"  onClick={handleSignIn}>
        {" "}
        <img src={googleIcon} className="w-4 h-auto"/>
        Sign in with Google
      </Button>
    </div>
  );
}
