import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RootProviders } from "@/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchModal } from "@/components/layout/search-modal";
import { FloatingElements } from "@/components/layout/floating-elements";
import { LoadingProvider } from "@/components/layout/loading-provider";
import { ASSETS } from "@/constants";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Future Home Properties | Premium Real Estate in Nigeria",
    template: "%s | Future Home Properties",
  },
  description: "Discover premium real estate properties in Lagos and across Nigeria. Luxury homes, apartments, commercial spaces, and investment opportunities.",
  keywords: ["real estate", "Lagos", "Nigeria", "property", "luxury homes", "apartments", "commercial property", "investment"],
  authors: [{ name: "Future Home Properties" }],
  creator: "Future Home Properties",
  icons: {
    icon: ASSETS.logo,
    apple: ASSETS.logo,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Future Home Properties",
    title: "Future Home Properties | Premium Real Estate in Nigeria",
    description: "Discover premium real estate properties in Lagos and across Nigeria.",
    images: [ASSETS.logo],
  },
  twitter: {
    card: "summary_large_image",
    title: "Future Home Properties",
    description: "Premium Real Estate in Nigeria",
    images: [ASSETS.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme-store');if(t){var p=JSON.parse(t);var th=p&&p.state&&p.state.theme;if(th==='dark'||th==='light'){document.documentElement.setAttribute('data-theme',th);}}else{var sys=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',sys);}}catch(e){document.documentElement.setAttribute('data-theme','light');}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} min-h-screen flex flex-col antialiased`}>
        <RootProviders>
          <LoadingProvider>
            <Navbar />
            <SearchModal />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingElements />
          </LoadingProvider>
        </RootProviders>
      </body>
    </html>
  );
}
