import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "@/style/button.module.scss";

interface ButtonProps {
  isActive: boolean;
  toggleMenu: () => void;
}

interface PerspectiveTextProps {
  label: string;
}

export default function Button({ isActive, toggleMenu }: ButtonProps) {
  const [hideBorder, setHideBorder] = useState(false);

  useEffect(() => {
    if (isActive) {
      setHideBorder(true);
    } else {
      const timer = setTimeout(() => setHideBorder(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className={`${styles.button} ${hideBorder ? styles.noBorder : ""}`}>
      <motion.div
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        {["Menu", "Fermer"].map((label, index) => (
          <div
            key={index}
            className={styles.el}
            onClick={toggleMenu}
          >
            <PerspectiveText label={label} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className={styles.perspectiveText}>
      <p>{label}</p>
      <p>{label}</p>
    </div>
  );
}