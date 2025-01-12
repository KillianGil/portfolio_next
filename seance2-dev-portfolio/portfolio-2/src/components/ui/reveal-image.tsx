"use client";

import { gql, useQuery } from "@apollo/client";
import { cn } from "@/lib/utils";

interface ImageSource {
  src: string;
  alt: string;
}

interface ShowImageListItemProps {
  text: string;
  images: [ImageSource, ImageSource];
  url: string;
}

function RevealImageListItem({ text, images, url }: ShowImageListItemProps) {
  const container = "absolute right-8 -top-1 z-40 h-20 w-16";
  const effect =
    "relative duration-500 delay-100 shadow-none group-hover:shadow-xl scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 group-hover:w-full group-hover:h-full w-16 h-16 overflow-hidden transition-all rounded-md";

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-fit w-fit overflow-visible py-6"
    >
      <h1 className="text-6xl font-black text-foreground transition-all duration-500 group-hover:opacity-40">
        {text}
      </h1>
      <div className={container}>
        <div className={effect}>
          <img alt={images[1].alt} src={images[1].src} className="h-full w-full object-cover" />
        </div>
      </div>
      <div
        className={cn(
          container,
          "translate-x-0 translate-y-0 rotate-0 transition-all delay-150 duration-500 group-hover:translate-x-6 group-hover:translate-y-6 group-hover:rotate-12"
        )}
      >
        <div className={cn(effect, "duration-200")}>
          <img alt={images[0].alt} src={images[0].src} className="h-full w-full object-cover" />
        </div>
      </div>
    </a>
  );
}

const GET_CONTACT_DATA = gql`
  query GetContactData {
    contacts {
      nom
      image1 {
        url
      }
      image2 {
        url
      }
      url
    }
  }
`;

export default function RevealImageList() {
  const { data, loading, error } = useQuery(GET_CONTACT_DATA);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const items = data.contacts.map((contact: any) => ({
    text: contact.nom,
    images: [
      { src: contact.image1.url, alt: "Image 1" },
      { src: contact.image2.url, alt: "Image 2" },
    ],
    url: contact.url,
  }));

  return (
    <div className="flex flex-col items-start gap-2 rounded-sm bg-background px-8 py-4">
      {items.map((item: ShowImageListItemProps, index: number) => (
        <RevealImageListItem
          key={index}
          text={item.text}
          images={item.images}
          url={item.url}
        />
      ))}
    </div>
  );
}