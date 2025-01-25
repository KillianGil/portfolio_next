import BoldCopy from "@/components/ui/bold-copy";
import RevealImageList from "@/components/ui/reveal-image";
import FaqSection from "@/components/ui/faq";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const words = "Questions fréquentes";

export default function ContactPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white px-8">

        <BoldCopy text="Contact" className="text-center" />
  
        <div className="mt-8 flex flex-col items-start justify-start gap-4 w-full">
          <RevealImageList />
        </div>

        <div className="mb-1 mt-14 flex justify-center items-center">
          <TextGenerateEffect words={words} />
        </div>
        <div className="mb-4 flex flex-col items-start justify-start gap-4 w-full">
          <FaqSection />
        </div>

      </div>
    );
  }