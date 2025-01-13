"use client";

import styles from "@/app/zoom.module.scss";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_IMAGES = gql`
  query GetImages {
    projetImageTransitions {
      imageTransition {
        url
      }
      indexImage
    }
  }
`;

interface Picture {
  src: string;
  scale: any;
}

export default function ZoomImage(): JSX.Element {
  const container = useRef<HTMLDivElement | null>(null);


  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"], 
  });


  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 4]); 

  const { data, loading, error } = useQuery(GET_IMAGES);

  if (loading) return <p>Chargement des images...</p>;
  if (error) {
    console.error("Erreur lors de la récupération des images :", error);
    return <p>Erreur : {error.message}</p>;
  }

  const pictures: Picture[] = data.projetImageTransitions
    .map((item: { imageTransition: { url: string }; indexImage: number }) => ({
      src: item.imageTransition.url,
      index: item.indexImage,
    }))
    .sort((a: { index: number }, b: { index: number }) => a.index - b.index)
    .map((image: { src: string; index: number }) => ({
      src: image.src,
      scale,
    }));

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale }}
            className={styles.el}
          >
            <div className={styles.imageContainer}>
              <Image src={src} fill alt={`image ${index + 1}`} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}