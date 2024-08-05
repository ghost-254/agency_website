import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "./components/Navigation/ResponsiveNav";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Outreach Connect | Advocating for the Homeless and Underserved",
  description: "Outreach Connect is dedicated to raising awareness of the needs of homeless and underserved individuals. We aim to secure grants and funding to support our advocacy work and initiatives. Our website serves as a professional platform to connect with potential grant providers and showcase our ongoing community outreach efforts. Led by a senior citizen, female veteran, and minority small business owner, Outreach Connect is committed to making a positive impact in the community. Visit our site to learn more about our mission, projects, and how you can support our cause.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider> 
          <ResponsiveNav />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
