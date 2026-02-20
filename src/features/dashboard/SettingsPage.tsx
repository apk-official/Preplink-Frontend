import { useAppSelector } from "@/redux/hooks";
import { Separator } from "@/components/ui/separator";
import AccountDeletion from "@/components/AccountDeletion";

export default function SettingsPage() {
  const { me } = useAppSelector((state) => state.user);
  if (!me) return <div>No user data</div>;
  const details = [
    { label: "Name", value: me.name },
    { label: "Email", value: me.email },
    { label: "Credit", value: me.credits },
  ];
  
  return (
    <>
      <h2 className="text-xl">Settings</h2>
      <div className="flex flex-col items-start justify-start gap-2 mt-5">
        <img
          src={me.img_url}
          alt="profile image"
          className="w-20 h-20 rounded-full bg-[#5E2BFF] mb-2 object-cover"
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
