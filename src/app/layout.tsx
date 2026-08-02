import type { Metadata } from "next";
import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Brevan Softwares - AI Automation & Web Design in Kenya",
    template: "%s - Brevan Softwares",
  },
  description:
    "Brevan Softwares is a Kenyan technology initiative by Emmanuel Kiplangat offering AI automation, website design, WordPress, Joomla, e-commerce, real estate platforms and graphic design for local businesses, schools and communities.",
  metadataBase: new URL("https://brevan-softwares.vercel.app"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome.css" />
        <link rel="stylesheet" href="/assets/css/templatemo-574-mexant.css" />
        <link rel="stylesheet" href="/assets/css/brevan.css" />
        <link rel="stylesheet" href="/assets/css/owl.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
