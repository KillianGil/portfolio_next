import React from "react";
import ZoomImage from "@/components/ui/ZoomImage";
import CardsParallax from "@/components/ui/cards-parallax";

const ProjectsPage = (): JSX.Element => {
  return (
    <div className="bg-[#020202] text-white min-h-screen">
      <div>
        <ZoomImage />
      </div>
      <CardsParallax />
    </div>
  );
};

export default ProjectsPage;