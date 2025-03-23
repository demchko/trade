import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, StickyNote } from "lucide-react";
import Link from "next/link";

export default async function UserPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }
  return (
    <div className="flex h-screen items-start w-full">
      <Tabs defaultValue="posts" className="h-full w-full">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1 justify-center items-center">
            <p className="text-xl font-semibold">
              {user.given_name} {user.family_name}
            </p>
            <p className="text-gray-500">{user.email}</p>
          </div>
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
          <div className="flex flex-col gap-4 w-full justify-center items-center bg-background rounded-lg">
            <Link
              href="/post/create"
              className="cursor-pointer group w-1/4 h-52 bg-purple-500 rounded-xl flex justify-center items-center text-[60px]"
            >
              <Plus className="group-hover:scale-120 duration-300 transition-transform w-16 h-16 text-purple-300" />
            </Link>
            <p className="text-xl text-gray-500">
              You do not have any posts yet
            </p>
          </div>
        </TabsContent>
        <TabsContent value="liked">Your liked</TabsContent>
      </Tabs>
    </div>
  );
}
