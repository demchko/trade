"use server";
// import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export const createPost = async (formData: FormData) => {
  console.log("Form", formData);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("api/auth/register");
  }
  //   const title = formData.get("title") as string;
  //   const content = formData.get("content") as string;
  //   await prisma.post.create({
  //     data: {
  //       title: title,
  //       description: content,
  //       imageUrl: "",
  //       authorId: user.id,
  //       authorImage: user.picture || "",
  //       authorName: user.given_name || "User",
  //     },
  //   });
  redirect("/user");
};
