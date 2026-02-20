import coverImg from "@/assets/LoginCover.svg";
import { Outlet } from "react-router";
import PrepLinkLogo from "@/assets/Logo Horizontal.svg"
import { Badge } from "@/components/ui/badge";

export default function Login() {
  return (
    <div className="p-4 flex lg:flex-row flex-col  h-screen bg-[#FEFEFE] gap-2">
      
      <div className="lg:w-1/2 w-full h-full flex flex-col item-center justify-start gap-6 text-center">
        <div className="flex flex-col h-1/2 justify-between">
           <div className="flex items-end justify-start gap-2">
            <img src={PrepLinkLogo} alt="Preplink Logo Horizontal" className="h-8 w-auto" />
            <Badge variant="default" className="bg-[#CC2936] text-[#FEFFFE]">Beta</Badge>
          </div>
          <Outlet />
        </div>
        
      </div>

      <div className="lg:w-1/2 relative lg:block hidden">
        <h2 className="absolute p-13 text-4xl font-light text-[#FEFEFE] cursor-default select-none">
          Ace Every Interview With{" "}
          <span className="font-semibold">
            <br />
            Smart Prep
          </span>{" "}
        </h2>
        <img src={coverImg} className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
}
