import { TrashIcon } from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useNavigate } from "react-router";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { clearUser } from "@/redux/slices/userSlice";
import { logout } from "@/redux/slices/authslice";

export default function AccountDeletion() {
   const { me } = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!me) return null;
    const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);

      const res = await apiFetch(`/api/v1/user/${me.user_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }

      // ✅ clear local session + state
      dispatch(clearUser());
      dispatch(logout());

      // ✅ send to login
      navigate("/auth/login", { replace: true });
    } catch (e) {
      console.error(e);
      // TODO: show toast/message
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-start justify-start mt-2">
        <h2 className="font-medium">Delete Account</h2>
        <p className="text-sm mb-3 text-[#3A4040]">
          Once you delete account, your account will permanently remove all your
          data. This action is irreversible
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="cursor-pointer bg-[#E62629]">
              <TrashIcon /> Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account?</AlertDialogTitle>
              <AlertDialogDescription>
                By proceeding, you acknowledge that all associated data will be permanently removed and cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer" disabled={isDeleting}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="cursor-pointer bg-[#E62629] hover:bg-[#DB1A1D]" onClick={handleDeleteAccount}
              disabled={isDeleting}>
                <TrashIcon />
                Delete Account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
