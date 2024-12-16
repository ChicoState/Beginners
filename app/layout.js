import localFont from "next/font/local";
import { Delius, Sacramento, Rubik_Puddles, Moirai_One } from 'next/font/google';
import "./globals.css";

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

const delius = Delius({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-delius',
  display: 'swap',
});

const sacramento = Sacramento({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-sacramento',
  display: 'swap',
});

const rubikPuddles = Rubik_Puddles({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-rubik-puddles',
  display: 'swap',
});

const moiraiOne = Moirai_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-moirai-one',
  display: 'swap',
});

export const metadata = {
  title: "Beginners",
  description: "Learn anything",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${delius.variable} ${sacramento.variable} ${rubikPuddles.variable} ${moiraiOne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
