import { Teko, Montserrat } from "next/font/google";
import "./globals.css";

// Agresivan, visok font za naslove
const teko = Teko({
  subsets: ["latin"],
  weight: ["400", "700"], // Trebaju nam i regular i bold
  variable: "--font-teko",
  display: "swap",
});

// Čitljiv, moderan font za telo teksta
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "GYM BRUTAL",
  description: "Personal trainer website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${teko.variable} ${montserrat.variable}`}>
      <body style={{ backgroundColor: '#050505', margin: 0 }}>{children}</body>
    </html>
  );
}