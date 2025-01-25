export const perspective = {
    initial: {
      opacity: 0,
      y: -50,
    },
    enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.2, 
        ease: [0.215, 0.61, 0.355, 1], 
      },
    }),
    exit: {
      opacity: 0,
      y: 50, 
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };
  
  export const slideIn = {
    initial: {
      opacity: 0,
      y: 50, 
    },
    enter: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.2,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    exit: {
      opacity: 0,
      y: 50, 
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };