import coverImg from "@/assets/LoginCover.svg";
import { Outlet } from "react-router";

export default function Login() {
  return (
    <div className="p-4 flex lg:flex-row flex-col  h-screen bg-[#FEFEFE] gap-2">
      <p className="font-bold">PrepLink</p>
      <div className="lg:w-1/2 w-full h-full flex flex-col item-center justify-center gap-6 text-center">
        <Outlet />
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
