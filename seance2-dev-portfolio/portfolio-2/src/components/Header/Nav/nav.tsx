import styles from '@/style/nav.module.scss';
import { motion } from 'framer-motion';
import { perspective, slideIn } from './anim';

interface Link {
  title: string;
  href: string;
}

export default function Index() {
  const links: Link[] = [
    { title: "Accueil", href: "/" },
    { title: "Projets", href: "/projets" },
    { title: "Formations", href: "/formations" },
    { title: "Expériences", href: "/experiences" },
    { title: "Contact", href: "/contact" },
  ];

  const footerLinks: Link[] = [
    { title: "LinkedIn", href: "https://www.linkedin.com/in/killian-gil-169b45183/" },
    { title: "Instagram", href: "https://www.instagram.com/killian.gil/" },
    { title: "Mail", href: "mailto:killiangil04@gmail.com" },
    { title: "Mon CV", href: "https://drive.google.com/file/d/1DjJazcDM8N11S3xgn7e2bAHpcpzg_JOG/view?usp=sharing" },
  ];

  return (
    <div className={styles.nav}>
      <Navigation links={links} />
      <Footer links={footerLinks} />
    </div>
  );
}

function Navigation({ links }: { links: Link[] }) {
  return (
    <div className={styles.body}>
      {links.map((link, i) => (
        <div key={`b_${i}`} className={styles.linkContainer}>
          <motion.div
            custom={i}
            variants={perspective}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <a href={link.href}>{link.title}</a>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function Footer({ links }: { links: Link[] }) {
  return (
    <motion.div className={styles.footer}>
      {links.map((link, i) => (
        <motion.a
          key={`f_${i}`}
          href={link.href}
          variants={slideIn}
          custom={i}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          {link.title}
        </motion.a>
      ))}
    </motion.div>
  );
}