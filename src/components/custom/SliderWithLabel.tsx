"use client";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export const SliderWithLabel = () => {
  const [progress, setProgress] = useState([1]);
  return (
    <div className="w-full flex items-center gap-4">
      <Slider
        value={progress}
        onValueChange={setProgress}
        min={1}
        max={5}
        step={1}
        name="condition"
      />
      <span className="w-[20px] text-xl font-bold">{progress[0]}</span>
    </div>
  );
};
