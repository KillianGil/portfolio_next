"use client";

import { gql, useQuery } from "@apollo/client";
import { HTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import WaveReveal from "./wave-reveal";

interface ImageProps extends HTMLAttributes<HTMLDivElement> {
  item: { image: string; title: string };
  index: number;
  activeItem: number;
}

interface ExpandableProps {
  autoPlay?: boolean;
  className?: string;
}

const GET_PASSIONS = gql`
  query GetPassions {
    passions {
      titre
      image {
        url
      }
    }
  }
`;

const List = ({ item, className, index, activeItem, ...props }: ImageProps) => (
  <div
    className={cn(
      "relative flex h-full w-20 min-w-10 cursor-pointer overflow-hidden rounded-md transition-all delay-0 duration-300 ease-in-out",
      {
        "flex-grow": index === activeItem,
      },
      className
    )}
    {...props}
  >
    <img
      src={item.image}
      alt={item.title}
      className={cn("h-full w-full object-cover", {
        "blur-[2px]": index !== activeItem,
      })}
    />
    {index === activeItem && (
      <div className="absolute bottom-4 left-4 min-w-fit text-white md:bottom-8 md:left-8">
        <WaveReveal
          duration="100ms"
          className="items-start justify-start text-xl sm:text-2xl md:text-5xl"
          text={item.title.replace(/ /g, "\u00A0")} // Assure que les espaces sont respectés
          direction="up"
          extraDelay={2000}
        />
      </div>
    )}
  </div>
);

export default function Expandable({ autoPlay = true, className }: ExpandableProps) {
  const { data, loading, error } = useQuery(GET_PASSIONS);
  const [activeItem, setActiveItem] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const passions = data?.passions?.map((passion: any) => ({
    image: passion.image.url,
    title: passion.titre,
  })) || [];

  useEffect(() => {
    if (!autoPlay || passions.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      if (!isHovering) {
        setActiveItem((prev) => (prev + 1) % passions.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, passions, isHovering]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error.message}</p>;
  }

  return (
    <div
      className={cn(
        "flex h-96 max-w-screen-lg mx-auto gap-1", // Limite la largeur et centre le composant
        className
      )}
    >
      {passions.map((item: any, index: number) => (
        <List
          key={item.title}
          item={item}
          index={index}
          activeItem={activeItem}
          onMouseEnter={() => {
            setActiveItem(index);
            setIsHovering(true);
          }}
          onMouseLeave={() => {
            setIsHovering(false);
          }}
        />
      ))}
    </div>
  );
}