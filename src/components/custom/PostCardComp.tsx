"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/app/actions";
import { DeleteButton } from "./DeleteButton";

interface PostCardProps {
  id: string;
  title: string;
  description: string;
  condition: string;
  imageUrl: string;
  authorName?: string;
  authorImage?: string;
}

export const PostCard = ({
  item,
  explorePage,
}: {
  item: PostCardProps;
  explorePage?: boolean;
}) => {
  return (
    <div className="border relative border-gray-700 group overflow-hidden rounded-lg bg-background shadow-md hover:shadow-lg">
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
        <p className="text-lg max-w-full truncate">{item.description}</p>
        <div className="w-full flex justify-between items-center text-lg">
          <p>Item condition</p>
          <p className="font-bold">{item.condition}/5</p>
        </div>
        {explorePage ? (
          <div className="flex items-center gap-4">
            <Image
              src={item.authorImage || ""}
              alt="user logo"
              width={22}
              height={22}
              className="rounded-full"
            />
            <p>{item.authorName}</p>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center">
            <div className="w-1/2 pr-2">
              <Button className="w-full">Edit</Button>
            </div>
            <form action={deletePost} className="w-1/2 pl-2">
              <input hidden readOnly name="id" value={item.id} />
              <DeleteButton />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
