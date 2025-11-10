import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../globals.css";

const lato = Lato({
  weight: ["300", "400", "700", "900"], // Choose the weights you need
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Traveler Profile",
  description: "Manage Your Profiles Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <div className="p-8">{children}</div>
      </body>
    </html>
  );
}
