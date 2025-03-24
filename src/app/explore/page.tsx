import { PostCard } from "@/components/custom/PostCardComp";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const getData = async () => {
  const data = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      authorName: true,
      authorImage: true,
      condition: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};

export default async function ExplorePage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/register");
  }

  const posts = await getData();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((item) => (
        <PostCard item={item} key={item.id} explorePage={true} />
      ))}
    </div>
  );
}
