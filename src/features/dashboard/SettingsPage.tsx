import { useAppSelector } from "@/redux/hooks";
import { Separator } from "@/components/ui/separator";
import AccountDeletion from "@/components/AccountDeletion";

export default function SettingsPage() {
  const user = useAppSelector((state) => state.user);

  const details = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Credit", value: user.credits },
  ];
  return (
    <>
      <h2 className="text-xl">Settings</h2>
      <div className="flex flex-col items-start justify-start gap-2 mt-5">
        <img
          src=""
          alt=""
          className="w-20 h-20 rounded-full bg-[#5E2BFF] mb-2"
        />
        {details.map((detail, index) => (
          <div key={index}>
            <p className="text-sm font-medium text-[#6B7676]">{detail.label}</p>
            <p className="text-sm text-[#131515]">{detail.value}</p>
          </div>
        ))}
      </div>
      <Separator className="mt-2" />
      <AccountDeletion/>
    </>
  );
}
