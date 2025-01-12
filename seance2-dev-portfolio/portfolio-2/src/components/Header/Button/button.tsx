import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./style.module.scss";

interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

interface PerspectiveTextProps {
  label: string;
}

export default function Button({ isActive, toggleMenu }: ButtonProps): JSX.Element {
  const [hideBorder, setHideBorder] = useState(false);

  useEffect(() => {
    if (isActive) {
      setHideBorder(true);
    } else {
      const timer = setTimeout(() => setHideBorder(false), 500); // Garde la bordure supprimée pendant l'animation
      return () => clearTimeout(timer); // Nettoyage du timer pour éviter des conflits
    }
  }, [isActive]);

  return (
    <div
      className={`${styles.button} ${hideBorder ? styles.noBorder : ""}`} // Applique la classe conditionnelle
    >
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className={styles.el}
          onClick={() => {
            toggleMenu();
          }}
        >
          <PerspectiveText label="Fermer" />
        </div>
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: PerspectiveTextProps): JSX.Element {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}