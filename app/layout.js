import "./globals.css";
import { Manrope, Archivo } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata = {
  title: "Sanyog Shakya",
  description:
    "I craft accessible and dynamic digital experiences for the web.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.className} text-white-100 bg-black-100`}>
        {children}
      </body>
    </html>
  );
}
