import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "../../globals.css";
import { AppSideBar } from "@/components/layout/Sidebar";
import { AppHeader } from "@/components/layout/Header";
import { portalManagementConfig } from "@/components/layout/Sidebar/portalManagementConfig";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Portal Management",
  description: "Manage your portal content and settings",
  icons: {
    icon: "/logo/omegalogo.svg",
  },
};

export default function PortalManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <div className="flex h-screen overflow-hidden">
          <AppSideBar menuItems={portalManagementConfig.menuItems} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <AppHeader/>
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
