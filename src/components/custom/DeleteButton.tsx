"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      className="w-full"
      type="submit"
      disabled={pending}
      variant="destructive"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin" />
          Deleting
        </div>
      ) : (
        "Delete"
      )}
    </Button>
  );
};
