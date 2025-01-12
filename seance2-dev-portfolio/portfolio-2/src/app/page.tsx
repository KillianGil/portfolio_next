import Image from "next/image";
import ClientProvider from "@/lib/ClientProvider";
import { LampDemo } from "@/components/ui/lamp";
import { Compare } from "@/components/ui/compare";
import HoverSpring from "@/components/ui/HoverSpring";
import Header from "@/components/Header";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Expandable from "@/components/ui/expandable"; 

const words = "Mes Compétences";

export default function Home() {
  return (
    <div>
      <LampDemo />
      <div className="flex justify-center items-center">
        <Compare />
      </div>
      <div className="my-8 flex justify-center items-center">
        <TextGenerateEffect words={words} />
      </div>
      <div className="flex justify-center items-center">
        <HoverSpring />
      </div>
      <div className="my-16">
        <h2 className="text-center text-3xl font-bold text-white mb-8">
          Mes Passions
        </h2>
        <Expandable />
      </div>
    </div>
  );
}