import React from 'react';
import Image from 'next/image';

interface NavigationItem {
  name: string;
  href: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  iconSrc?: string; 
}

const navigation: {
  main: NavigationItem[];
  social: NavigationItem[];
} = {
  main: [
    { name: 'Accueil', href: '/' },
    { name: 'Projets', href: '/projets' },
    { name: 'Formations', href: '/formations' },
    { name: 'Expériences', href: '/experiences' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Instagram',
      href: 'https://instagram.com/killian.gil',
      iconSrc: '/insta-svg.svg', 
    },
    {
      name: 'Mail',
      href: 'mailto:killiangil04@gmail.com',
      iconSrc: '/mail-svg.svg', 
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/killian-gil-169b45183/',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          {...props}
          className="h-6 w-6 hover:scale-110 transition-transform duration-200"
        >
          <path
            fillRule="evenodd"
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="w-3/5 mx-auto h-[1px] bg-white mb-2" />
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center transform scale-105">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-1">
              <a
                href={item.href}
                className="relative text-sm text-white dark:text-gray-100 transition-all duration-200 ease-in-out group"
              >
                {item.name}
                <span className="absolute bottom-[-8px] left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300 ease-in-out"></span>
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-6 flex justify-center space-x-6 transform scale-105">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-white hover:text-gray-300 dark:text-gray-100 transition-all duration-200 ease-in-out"
            >
              <span className="sr-only">{item.name}</span>
              {item.iconSrc ? (
                <Image
                  src={item.iconSrc}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="h-6 w-6 hover:scale-110 transition-transform duration-200"
                />
              ) : (
                item.icon && <item.icon />
              )}
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white dark:text-gray-100 transform scale-105">
          &copy; {new Date().getFullYear()} Killian Gil. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;