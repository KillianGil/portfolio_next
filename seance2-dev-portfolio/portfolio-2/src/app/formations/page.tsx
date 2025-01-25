"use client";

import { Timeline } from "@/components/ui/timeline";
import { gql, useQuery } from "@apollo/client";
import WhirlpoolLoader from "@/components/ui/whirlpool-Loader";
import TextRotate from "@/components/ui/text-rotate";

const GET_FORMATIONS = gql`
  query GetFormations {
    formations {
      titre
      description
      dateFormation 
      image {
        url
      }
    }
  }
`;

const FormationPage = () => {
  const { data, loading, error } = useQuery(GET_FORMATIONS);

  if (loading) {
    return <WhirlpoolLoader />;
  }
  if (error) {
    console.error("Erreur Apollo :", error);
    return <p>Erreur : {error.message}</p>;
  }

  const timelineData = data.formations.map((formation: any) => ({
    title: formation.titre,
    content: (
      <div>
        <p className="text-neutral-400 text-sm md:text-base font-medium mb-2">
          {formation.dateFormation}
        </p>
        <p className="text-white text-xs md:text-sm font-normal mb-8">
          {formation.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img
            src={formation.image.url}
            alt={formation.titre}
            className="rounded-lg object-cover h-40 md:h-60 lg:h-80 w-full shadow-md"
          />
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full bg-[#020202]">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          <TextRotate/>
        </h1>
        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

export default FormationPage;