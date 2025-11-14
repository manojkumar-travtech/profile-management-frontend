import type { Metadata } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "../globals.css";
import { AppSideBar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/Header";
import { sidebarConfig } from "@/components/layout/Sidebar/sidebarConfig";

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Travel Profile Management",
  description: "Travel Profile Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable}  antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <AppSideBar menuItems={sidebarConfig.menuItems} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
              {children}
            </main>
          </div>
        </div>{" "}
      </body>
    </html>
  );
}
