"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { gql, useQuery } from "@apollo/client";

const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      titre
      description
      contenu {
        html
      }
      image {
        url
      }
      texteBouton
      urlBouton
    }
  }
`;

interface Experience {
  titre: string;
  description: string;
  contenu: {
    html: string;
  };
  image: {
    url: string;
  };
  texteBouton?: string;
  urlBouton?: string;
}

export function ExpandableCardDemo() {
  const { data, loading, error } = useQuery(GET_EXPERIENCES);
  const [active, setActive] = useState<Experience | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const experiences = data.experiences;

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.titre}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute top-2 right-2 lg:hidden bg-white rounded-full h-6 w-6 flex items-center justify-center"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.titre}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 text-white sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.titre}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.image.url}
                  alt={active.titre}
                  className="w-full h-80 object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="max-w-[70%]"> {/* Limite la largeur de la description */}
                    <motion.h3
                      layoutId={`title-${active.titre}-${id}`}
                      className="font-medium text-white text-base"
                    >
                      {active.titre}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-sm text-neutral-400 mt-1"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {active.urlBouton && (
                    <motion.a
                      layout
                      href={active.urlBouton}
                      target="_blank"
                      className="px-6 py-3 text-sm rounded-full font-bold bg-black text-white border border-white hover:bg-white hover:text-black transition-colors duration-200"
                    >
                      {active.texteBouton}
                    </motion.a>
                  )}
                </div>
                <div className="pt-4 px-4">
                  <motion.div
                    layout
                    className="text-sm text-neutral-400 h-40 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: active.contenu.html }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp: any) => (
          <motion.div
            key={exp.titre}
            layoutId={`card-${exp.titre}-${id}`}
            onClick={() => setActive(exp)}
            className="p-4 flex flex-col rounded-lg cursor-pointer bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-200"
          >
            <div className="flex flex-col gap-4">
              <motion.div layoutId={`image-${exp.titre}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={exp.image.url}
                  alt={exp.titre}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="text-center">
                <motion.h3
                  layoutId={`title-${exp.titre}-${id}`}
                  className="font-medium text-white"
                >
                  {exp.titre}
                </motion.h3>
                <motion.p
                  layoutId={`description-${exp.description}-${id}`}
                  className="text-sm text-neutral-400"
                >
                  {exp.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path d="M18 6L6 18" />
    <path d="M6 6l12 12" />
  </motion.svg>
);