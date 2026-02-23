import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, Space_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-drama",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ebin John Joseph — Full-Stack Engineer",
  description:
    "Full-stack engineer crafting production systems — from cloud infrastructure and scalable backends to the interfaces people actually use.",
  keywords: [
    "Ebin John Joseph",
    "Full-Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
  ],
  metadataBase: new URL("https://ebin.pro"),
  openGraph: {
    title: "Ebin John Joseph — Full-Stack Engineer",
    description:
      "Full-stack engineer crafting production systems with modern technologies.",
    type: "website",
    url: "https://ebin.pro",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ebin John Joseph — Full-Stack Engineer",
    description:
      "Full-stack engineer crafting production systems with modern technologies.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link id="favicon" rel="icon" type="image/svg+xml" href="/favicon-light.svg" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d){document.documentElement.setAttribute('data-theme','dark');document.getElementById('favicon').href='/favicon-dark.svg'}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSerif.variable} ${spaceMono.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
