import BoldCopy from "@/components/ui/bold-copy";
import RevealImageList from "@/components/ui/reveal-image";

export default function ContactPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white px-8">

        <BoldCopy text="Contact" className="text-center" />
  
        <div className="mt-8 flex flex-col items-start justify-start gap-4 w-full">
          <RevealImageList />
        </div>
      </div>
    );
  }