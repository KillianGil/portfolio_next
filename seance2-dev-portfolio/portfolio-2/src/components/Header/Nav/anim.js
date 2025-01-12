export const perspective = {
    initial: {
      opacity: 0,
      y: -50, // Lignes venant du haut
    },
    enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.2, // Décalage progressif pour chaque ligne
        ease: [0.215, 0.61, 0.355, 1], // Courbe d'animation fluide
      },
    }),
    exit: {
      opacity: 0,
      y: 50, // Lignes disparaissent vers le bas
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  
  export const slideIn = {
    initial: {
      opacity: 0,
      y: 50, // Les éléments commencent plus bas
    },
    enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.2, // Décalage progressif pour chaque élément
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: {
      opacity: 0,
      y: 50, // Les éléments disparaissent vers le bas
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };