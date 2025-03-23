"use client";

import { createPost } from "@/app/actions";
import { ImageUploader } from "@/components/custom/ImageUploader";
import { SliderWithLabel } from "@/components/custom/SliderWithLabel";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CreatePostForm() {
  return (
    <div className="flex flex-col gap-4 h-screen items-start w-full">
      <p className="text-3xl font-bold">Create a new post</p>
      <form className="w-full flex gap-8" action={createPost}>
        <ImageUploader />

        <div className="w-2/3 flex flex-col gap-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="title" className="text-xl font-semibold">
              Title
            </Label>
            <Input
              className="w-full"
              name="title"
              id="title"
              placeholder="Enter title..."
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="content" className="text-xl font-semibold">
              Description
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Describe your item..."
              className="max-h-[150px]"
              required
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="condition" className="text-xl font-semibold">
              Item condition
            </Label>
            <SliderWithLabel />
          </div>
          <div className="flex justify-end items-center gap-4">
            <Link href="/user" className={cn(buttonVariants(), "w-[150px]")}>
              Cancel
            </Link>
            <Button className="w-[150px]" variant="purple" type="submit">
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
