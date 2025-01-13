"use client";

import React from "react";
import SlideArrowButton from "@/components/ui/slide-arrow-button";

export default function InformationsSection({
  imageSrc = "/kil-photo.jpg", 
}: {
  imageSrc?: string;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#27272a] rounded-lg p-6 md:p-10 w-full max-w-5xl mx-auto my-12">

      <div className="flex-1 text-white">
        <h2 className="text-3xl font-bold mb-4">Informations</h2>
        <p className="text-lg mb-6">
          Je m’appelle Killian Gil et je suis un étudiant de 21 ans en Master 1
          Design UI/UX au sein de l’UFR Ingémédia à l’Université de Toulon. Je
          suis actuellement à la recherche d'un stage de 12 semaines.
        </p>
        <SlideArrowButton
          text="Me Contacter"
          primaryColor="#000000" 
          className="mt-4"
          onClick={() => window.location.href = "/contact"} 
        />
      </div>

      <div className="flex-1 relative mt-6 md:mt-0 md:ml-10 max-w-sm">
        <img
          src={imageSrc}
          alt="Killian Gil"
          className="w-full max-h-[300px] object-cover rounded-lg"
        />
      </div>
    </div>
  );
}