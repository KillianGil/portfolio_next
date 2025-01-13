import { LampDemo } from "@/components/ui/lamp";
import HoverSpring from "@/components/ui/HoverSpring";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Expandable from "@/components/ui/expandable";
import InformationsSection from "@/components/ui/informations";

const words = "Mes Compétences";
const words2 = "Mes Passions";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <LampDemo />
      <section className="mb-6">
        <div className="flex justify-center items-center">
          <InformationsSection />
        </div>
      </section>
      <section className="my-8">
        <div className="mb-4 flex justify-center items-center">
          <TextGenerateEffect words={words} />
        </div>
        <div className="flex justify-center items-center">
          <HoverSpring />
        </div>
      </section>
      <section className="my-12">
        <div className="mb-4 flex justify-center items-center">
          <TextGenerateEffect words={words2} />
        </div>
        <Expandable />
      </section>
    </main>
  );
}