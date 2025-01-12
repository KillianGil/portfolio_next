'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Competences = [
  {
    id: 1,
    name: 'Design UI/UX',
    description: 'Création d’interfaces utilisateurs ergonomiques et esthétiques pour une expérience optimale.',
    image: '/icon-ux-ui.png',
  },
  {
    id: 2,
    name: 'WebDesign',
    description: 'Conception de sites web modernes et attractifs, adaptés aux besoins des utilisateurs.',
    image: '/icon-webdesign.png',
  },
  {
    id: 3,
    name: 'Développement',
    description: 'Développement web et mobile avec des technologies modernes pour des projets performants.',
    image: '/icon-informatique.png',
  },
  {
    id: 4,
    name: 'Design Graphique',
    description: 'Création de supports visuels uniques et impactants pour une communication efficace.',
    image: '/icon-design-graphique.png',
  },
  {
    id: 5,
    name: 'Méthodes Agiles',
    description: 'Connaissance des principes Agiles pour une gestion de projet efficace et collaborative.',
    image: '/icon-agile.png',
  },
];

const HoverSpring = () => {
  return (
    <div className="py-10">
      <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {Competences.map((competences) => (
          <motion.div
            whileHover={{
              y: -8,
            }}
            transition={{
              type: 'spring',
              bounce: 0.7,
            }}
            key={competences.id}
            className="p-4 text-left rounded-lg shadow-md bg-[#2c2c2c] dark:bg-[#1e1e1e]"
          >
            <Image
              src={competences.image}
              width={30}
              height={30}
              className="mb-3 rounded-lg"
              alt={competences.name}
            />
            <div className="mb-1 text-lg font-medium text-gray-900 dark:text-gray-100">
              {competences.name}
            </div>
            <div className="max-w-[250px] text-sm font-normal text-gray-500 dark:text-gray-400">
              {competences.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HoverSpring;