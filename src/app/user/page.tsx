import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Plus, StickyNote } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const getData = async (userId: string) => {
  const data = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
  });
  return data;
};

export default async function UserPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }

  const posts = await getData(user.id);
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
        <TabsContent value="posts">
          {posts.length ? (
            <>
              <div className="flex justify-end">
                <Link
                  href="/post/create"
                  className={cn(buttonVariants({ variant: "purple" }))}
                >
                  Add more
                </Link>
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-700 group overflow-hidden rounded-lg bg-background shadow-md hover:shadow-lg"
                  >
                    <Link href="/" className="block w-full h-full">
                      <div className="w-full h-48 relative overflow-hidden">
                        <Image
                          src={item.imageUrl}
                          alt="post image"
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-115"
                        />
                      </div>
                      <div className="flex flex-col p-3 gap-4">
                        <p className="text-2xl font-bold">{item.title}</p>
                        <p className="text-lg max-w-full truncate">
                          {item.description}
                        </p>
                        <div className="w-full flex justify-between items-center text-lg">
                          <p>Item condition</p>
                          <p className="font-bold">{item.condition}/5</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-full flex justify-center">
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
            </div>
          )}
        </TabsContent>
        <TabsContent value="liked">Your liked</TabsContent>
      </Tabs>
    </div>
  );
}
