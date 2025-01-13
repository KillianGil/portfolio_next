import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WaveRevealProps {
  text: string;
  className?: string;
  direction?: "up" | "down";
  mode?: "letter" | "word";
  duration?: string;
  blur?: boolean;
  letterClassName?: string;
  delay?: number;
  extraDelay?: number;
}

interface ReducedValue {
  nodes: ReactNode[];
  offset: number;
  duration: string | number;
  delay: number;
  className?: string;
  blur?: boolean;
  direction?: "up" | "down";
  mode?: "letter" | "word";
  wordsLength: number;
  textLength: number;
}

const createDelay = ({ index, offset, delay }: { index: number; offset: number; delay: number }) =>
  `${delay + (index + offset) * 30}ms`; 

const Word = ({
  word,
  index,
  offset,
  delay,
  duration,
  className,
  isWordMode,
}: {
  word: string;
  index: number;
  offset: number;
  delay: number;
  duration: string | number;
  className: string;
  isWordMode: boolean;
}) =>
  isWordMode ? (
    word
  ) : (
    <>
      {word.split("").map((letter, letterIndex) => (
        <span
          key={`${letter}_${letterIndex}_${index}`}
          className={className}
          style={{
            animationDuration: `${duration}`,
            animationDelay: createDelay({ index: letterIndex, offset, delay }),
          }}
        >
          {letter}
        </span>
      ))}
    </>
  );

const createAnimatedNodes = (
  args: ReducedValue,
  word: string,
  index: number
): ReducedValue => {
  const { nodes, offset, duration, delay, className, blur, direction, mode } = args;
  const isWordMode = mode === "word";
  const isUp = direction === "up";

  const wordNode = (
    <span
      key={`word_${index}`}
      className="contents"
      style={{
        animationDuration: isWordMode ? `${duration}` : undefined,
        animationDelay: isWordMode
          ? createDelay({ index, offset, delay })
          : undefined,
      }}
    >
      <Word
        word={word}
        index={index}
        offset={offset}
        delay={delay}
        duration={duration}
        className={cn(
          "inline-block opacity-0 transition-all ease-in-out fill-mode-forwards",
          {
            ["animate-[reveal-down]"]: !isUp && !blur,
            ["animate-[reveal-up]"]: isUp && !blur,
            ["animate-[reveal-down,content-blur]"]: !isUp && blur,
            ["animate-[reveal-up,content-blur]"]: isUp && blur,
          },
          className
        )}
        isWordMode={isWordMode}
      />
      {" "} {/* Ajout explicite de l'espace après chaque mot */}
    </span>
  );

  return {
    ...args,
    nodes: [...nodes, wordNode],
    offset: offset + (isWordMode ? 1 : word.length),
  };
};

export default function WaveReveal({
  text,
  direction = "down",
  mode = "letter",
  className,
  duration = "700ms",
  delay = 0,
  blur = false,
  letterClassName,
  extraDelay = 2000, 
}: WaveRevealProps) {
  if (!text) {
    return null;
  }

  const words = text.split(" ");

  const { nodes } = words.reduce<ReducedValue>(createAnimatedNodes, {
    nodes: [],
    offset: 0,
    duration: parseInt(duration) + extraDelay + "ms", 
    delay,
    className: letterClassName,
    blur,
    direction,
    mode,
    wordsLength: words.length,
    textLength: text.length,
  });

  return (
    <div
      className={cn(
        "relative flex flex-wrap justify-center whitespace-pre px-2 text-4xl font-black md:px-6 md:text-6xl",
        className
      )}
    >
      {nodes}
      <div className="sr-only">{text}</div>
    </div>
  );
}