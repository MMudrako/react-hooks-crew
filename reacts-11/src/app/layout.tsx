import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar";
import "./globals.css";
//import './test.css'

import { Inter, League_Script, Oxanium } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const leagueScript = League_Script({ subsets: ['latin'], weight: '400', variable: '--font-league-script' });
const oxanium = Oxanium({ subsets: ['latin'], variable: '--font-oxanium', weight: '400' });

export const metadata = {
  title: "React's Eleven Hooks",
  description: "An interactive React tutorial, featuring the Eleven core React hooks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${leagueScript.variable} ${oxanium.variable}`}>
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
