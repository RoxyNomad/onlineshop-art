import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "@/app/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atelier Noir | Exklusive Kunst & Gemälde",
  description: "Entdecke handverlesene Kunstwerke und moderne Meisterwerke.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={geistSans.variable}>
      <body>
        <main className="min-h-screen flex flex-col justify-between">
          {children}
        </main>
      </body>
    </html>
  );
}