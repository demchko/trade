"use server";
import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/register");
  }
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const condition = formData.get("condition") as string;
  await prisma.post.create({
    data: {
      title: title,
      description: content,
      condition: condition,
      imageUrl: imageUrl,
      authorId: user.id,
      authorImage: user.picture || "",
      authorName: user.given_name || "User",
    },
  });
  redirect("/user");
};

export const deletePost = async (formData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/register");
  }
  const id = formData.get("id") as string;
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
  redirect("/user");
};
