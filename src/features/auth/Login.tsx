import coverImg from "@/assets/LoginCover.svg";
export default function Login() {
  return (
    <div className="p-4 flex h-screen bg-[#FEFEFE] gap-4">
      <div className="lg:w-1/2 w-full"></div>
      <div className="lg:w-1/2 relative lg:block hidden">
        <h2 className="absolute p-13 text-4xl font-light text-[#FEFEFE] cursor-default select-none">Ace Every Interview With <span className="font-semibold"><br/>Smart  Prep</span> </h2>
        <img src={coverImg} className="w-full h-full object-cover rounded-xl" />
      </div>
    </div>
  );
}
