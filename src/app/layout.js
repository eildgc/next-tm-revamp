import { Inter } from "next/font/google";
import "./globals.css";
import PrimaryNavigation from "@/components/navigation/PrimaryNavigation";
import Footer from "@/components/footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/context/AuthContext";
import './embla.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Team building",
  description: "Little fullstack project",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  console.log("session", session);
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <SessionProvider>
          <PrimaryNavigation />
          <div>
            <main className="max-w-screen-2xl px-6 xl:px-10 mx-auto py-[10vh]">
              {children}
            </main>
          </div>
          <Footer />
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
          <div className="cube"></div>
        </SessionProvider>
      </body>
    </html>
  );
}
