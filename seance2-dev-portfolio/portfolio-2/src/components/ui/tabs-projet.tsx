"use client";

import { gql, useQuery } from "@apollo/client";
import { Tabs } from "../ui/tabs";
import WhirlpoolLoader from "../ui/whirlpool-Loader"; // Import du loader

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
    }
  }
`;

export function TabsDemo() {
  const { data, loading, error } = useQuery(GET_PROJECTS);

  if (loading) {
    return <WhirlpoolLoader />; 
  }

  if (error) {
    return <p className="text-red-500 text-center">Erreur : {error.message}</p>;
  }

  const tabs = data.projets.map((projet: any) => ({
    title: projet.titre,
    value: projet.titre,
    content: (
      <div className="w-full overflow-hidden relative flex items-center gap-6 rounded-2xl p-6 text-white bg-[#27272a] h-[450px]">
        {/* Texte à gauche */}
        <div className="flex flex-col flex-1 justify-between h-full">
          <div className="mb-4">
            <h2 className="text-3xl font-bold">{projet.titre}</h2>
            <p className="text-sm mt-2">{projet.description.text}</p>
          </div>
          <a
            href={projet.lienProjet}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit px-4 py-2 text-white bg-black border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Voir le projet
          </a>
        </div>

        {/* Image à droite */}
        <div className="flex-1 relative overflow-hidden h-full rounded-lg">
          <img
            src={projet.imageProjet.url}
            alt={projet.titre}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    ),
  }));

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-12">
      <Tabs
        tabs={tabs}
        containerClassName="mb-1" 
        activeTabClassName="bg-[#27272a] text-white text-lg"
        tabClassName="text-gray-500 hover:text-white text-lg"
      />
    </div>
  );
}