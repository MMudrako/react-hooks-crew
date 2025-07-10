import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar";
import "./globals.css";
//import './test.css'

import { Inter, League_Script, Uncial_Antiqua } from "next/font/google";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const leagueScript = League_Script({ subsets: ['latin'], weight: '400', variable: '--font-league-script' });

export const metadata = {
  title: "React's Eleven Hooks",
  description: "An interactive React tutorial, featuring the Eleven core React hooks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${leagueScript.variable}`}>
      <body >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
