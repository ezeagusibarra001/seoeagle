import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { auth, currentUser } from "@clerk/nextjs/server";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <AppContextProvider userId={userId}>
          <body className={inter.className}>
            <Header />
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </body>
        </AppContextProvider>
      </html>
    </ClerkProvider>
  );
}
