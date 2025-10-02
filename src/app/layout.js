import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/main-layout";
import Providers from "./providers";
import AuthChecker from "@/components/auth/AuthChecker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HMS Next App",
  description: "Hospital Management System built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthChecker>
            <MainLayout>{children}</MainLayout>
          </AuthChecker>
        </Providers>
      </body>
    </html>
  );
}
