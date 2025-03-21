import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, StickyNote } from "lucide-react";

export default async function UserPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }
  return (
    <div className="flex h-screen items-start">
      <div className="w-1/5 flex flex-col justify-center items-center gap-4">
        <Image
          src={user.picture || ""}
          alt="user logo"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-xl font-semibold">
            {user.given_name} {user.family_name}
          </p>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="w-4/5 h-full">
        <Tabs defaultValue="posts" className="h-full">
          <div className="w-full flex justify-end">
            <TabsList>
              <TabsTrigger value="posts">
                <StickyNote />
                Posts
              </TabsTrigger>
              <TabsTrigger value="liked">
                <Heart />
                Likes
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent className="h-full flex justify-center" value="posts">
            <div className="flex flex-col gap-4 w-full justify-center items-center">
              <div className="cursor-pointer group w-1/4 h-52 bg-purple-500 rounded-xl flex justify-center items-center text-[60px]">
                <Plus className="group-hover:scale-120 duration-300 transition-transform w-16 h-16 text-purple-300" />
              </div>
              <p className="text-xl text-gray-500">
                You do not have any posts yet
              </p>
            </div>
          </TabsContent>
          <TabsContent value="liked">Your liked</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
