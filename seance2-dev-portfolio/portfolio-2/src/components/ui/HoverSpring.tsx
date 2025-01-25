'use client';

import { motion } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';
import Image from 'next/image';

const GET_COMPETENCES = gql`
  query GetCompetences {
    competences {
      id
      titre
      description
      image {
        url
      }
    }
  }
`;

const HoverSpring = () => {
  const { data, loading, error } = useQuery(GET_COMPETENCES);

  if (loading) return <p className="text-white">Chargement...</p>;
  if (error) return <p className="text-red-500">Erreur : {error.message}</p>;

  return (
    <div className="py-10">
      <div className="grid w-full grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
        {data.competences.map((competence: any) => (
          <motion.div
            whileHover={{
              y: -8,
            }}
            transition={{
              type: 'spring',
              bounce: 0.7,
            }}
            key={competence.id}
            className="p-4 text-left rounded-lg shadow-md bg-[#2c2c2c] dark:bg-[#1e1e1e]"
          >
            <Image
              src={competence.image.url}
              width={30}
              height={30}
              className="mb-3 rounded-lg"
              alt={competence.titre}
            />
            <div className="mb-1 text-lg font-medium text-gray-100 dark:text-gray-100">
              {competence.titre}
            </div>
            <div className="max-w-[250px] text-sm font-normal text-gray-400 dark:text-gray-400">
              {competence.description}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HoverSpring;