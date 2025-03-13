import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Header from "@/components/organisms/Header/Header";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Upskill",
  description: "Upskill demo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Header />
        <div className="pt-18">{children}</div>
      </body>
    </html>
  );
}
