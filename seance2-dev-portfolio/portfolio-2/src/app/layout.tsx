import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import HeaderMenu from "@/components/Header/menu";
import ClientProvider from "@/lib/ClientProvider";
import Footer from "@/components/Footer";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore my work and passions",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <Header />
          <main className="pt-24 mx-auto">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="fixed left-0 w-full z-50 flex items-center px-6 h-20 bg-[#020202]">
      <div className="text-2xl font-bold flex items-center">
        <a href="/" className="mt-6 ml-10">
          <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
        </a>
      </div>
      <div className="flex items-center h-full">
        <HeaderMenu />
      </div>
    </header>
  );
}