import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { perspective, slideIn } from './anim';

interface Link {
  title: string;
  href: string;
}

export default function Index(): JSX.Element {
  // Les liens principaux
  const links: Link[] = [
    { title: "Accueil", href: "/" },
    { title: "Projets", href: "/projets" },
    { title: "Formations", href: "/formations" },
    { title: "Expériences", href: "/experiences" },
    { title: "Contact", href: "/contact" },
  ];

  // Les liens de pied de page
  const footerLinks: Link[] = [
    { title: "LinkedIn", href: "/https://www.linkedin.com/in/killian-gil-169b45183/" },
    { title: "Instagram", href: "/" },
    { title: "Mail", href: "mailto:killiangil04@gmail.com" }

  ];

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link: Link, i: number) => {
          const { title, href } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <a href={href}>{title}</a>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link: Link, i: number) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              href={href}
              key={`f_${i}`}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}