"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Plus, Image as Picture, Upload } from "lucide-react";

export const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelection = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    // Set temporary preview
    setPreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", file);

      // Upload to your server
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setSelectedImage(data.url);
    } catch (error) {
      console.error("Upload failed:", error);
      // Reset preview on error
      setPreview(null);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="cursor-pointer w-1/3 border-5 border-dashed border-background h-[300px] rounded-xl hover:border-solid transition-all flex flex-col gap-4 justify-center items-center relative"
      onClick={triggerFileInput}
    >
      {preview ? (
        <div className="w-full h-full relative">
          <Image
            src={preview}
            alt="Selected image"
            fill
            className="rounded-xl object-contain"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
              <div className="text-white flex flex-col items-center">
                <Upload className="animate-pulse" />
                <p>Uploading...</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <Picture className="w-22 h-22 text-background" />
          <Button variant="purple">
            <Plus />
            Add photo
          </Button>
        </>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelection}
        accept="image/*"
        className="hidden"
        name="image"
      />
      <input type="hidden" name="imageUrl" value={selectedImage || ""} />
    </div>
  );
};
