import Link from "next/link";
import { Input } from "../ui/input";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const NavBar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div className="w-full py-3 bg-card px-[150px] flex items-center gap-4">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/d/db/Zeronet_logo.png"
        alt="logo"
        width={32}
        height={32}
      />
      <Link href="/" className={cn(buttonVariants({ variant: "link" }))}>
        Home
      </Link>
      <Link href="/explore" className={cn(buttonVariants({ variant: "link" }))}>
        Explore
      </Link>
      <Input search={true} placeholder="Search..." />
      {user ? (
        <>
          <Link
            href="/user"
            className="relative min-h-[40px] min-w-[40px] max-h-[50px] max-w-[50px]"
          >
            <Image
              src={user.picture || ""}
              alt="user logo"
              fill
              className="rounded-full"
            />
          </Link>
          <LogoutLink className={cn(buttonVariants({ variant: "purple" }))}>
            Logout
          </LogoutLink>
        </>
      ) : (
        <>
          <LoginLink className={cn(buttonVariants({ variant: "ghost" }))}>
            Login
          </LoginLink>
          <RegisterLink className={cn(buttonVariants({ variant: "purple" }))}>
            Sign up
          </RegisterLink>
        </>
      )}
    </div>
  );
};
