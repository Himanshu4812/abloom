import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Abloom | Awesomely Blossom with Nature - Hiranmayi",
  description:
    "Discover Abloom, an exclusive nature-centric villa community near Nashik. Experience green luxury, tranquility, and spirituality spread over 3 acres with only 10 premium plots.",
  keywords: [
    "Abloom",
    "Hiranmayi",
    "Nashik real estate",
    "villa plots",
    "green luxury",
    "nature living",
    "Trambakeshwar",
  ],
  openGraph: {
    title: "Abloom | Awesomely Blossom with Nature",
    description:
      "Discover Abloom, an exclusive nature-centric villa community near Nashik offering green luxury and tranquility.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#2d5a3d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
