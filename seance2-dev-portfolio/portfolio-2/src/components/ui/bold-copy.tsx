import { Tourney } from "next/font/google";
import { cn } from "@/lib/utils";

const tourney = Tourney({
  subsets: ["latin"],
});

export default function BoldCopy({
  text = "Contact",
  className,
  textClassName,
  backgroundTextClassName,
}: {
  text: string;
  className?: string;
  textClassName?: string;
  backgroundTextClassName?: string;
}) {
  if (!text?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative flex items-center justify-center bg-background px-2 py-2 md:px-6 md:py-4",
        tourney.className,
        className
      )}
    >
      {/* Texte d'arrière-plan avec opacité réduite */}
      <div
        className={cn(
          "text-4xl font-bold uppercase text-white/20 transition-all group-hover:opacity-50 md:text-8xl",
          backgroundTextClassName
        )}
      >
        {text}
      </div>

      {/* Texte principal au premier plan */}
      <div
        className={cn(
          "text-md absolute font-bold uppercase text-white transition-all group-hover:text-4xl md:text-3xl group-hover:md:text-8xl",
          textClassName
        )}
      >
        {text}
      </div>
    </div>
  );
}