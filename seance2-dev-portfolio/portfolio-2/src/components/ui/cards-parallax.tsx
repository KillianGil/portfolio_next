'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';
import styles from '@/app/cards.module.scss';

const GET_PROJECTS = gql`
  query GetProjects {
    projets {
      titre
      description {
        text
      }
      lienProjet
      imageProjet {
        url
      }
      technologies
    }
  }
`;

interface CardProps {
  i: number;
  projet: {
    titre: string;
    description: { text: string };
    lienProjet: string;
    imageProjet: { url: string };
    technologies: string[];
  };
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, projet, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
        style={{ 
          scale, 
          top: `calc(-5vh + ${i * 25}px)`
        }} 
        className={styles.card}
      >
        <h2>{projet.titre}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{projet.description.text}</p>
            <span>
              <a href={projet.lienProjet} target="_blank" rel="noopener noreferrer">
                En Savoir Plus
              </a>
              <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z" fill="black"/>
              </svg>
            </span>
          </div>
          <div className={styles.imageContainer}>
            <motion.div
              className={styles.inner}
              style={{ scale: imageScale }}
            >
              <Image
                src={projet.imageProjet.url}
                alt={projet.titre}
                fill
                className={styles.image}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CardsParallax = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) return <p>Chargement des projets...</p>;
  if (error) return <p>Erreur lors du chargement des projets</p>;

  return (
    <div ref={containerRef} className={styles.container}>
      {data?.projets.map((projet: {
        titre: string;
        description: { text: string };
        lienProjet: string;
        imageProjet: { url: string };
        technologies: string[];
      }, i: number) => {
        const targetScale = 1 - (data.projets.length - i) * 0.05;
        return (
          <Card
            key={i}
            i={i}
            projet={projet}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
};

export default CardsParallax;