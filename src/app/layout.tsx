import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display, Space_Mono, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import HapticLayer from "@/components/HapticLayer";
import CommandPalette from "@/components/CommandPalette";
import { Analytics } from "@vercel/analytics/next";
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

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-diagram",
  subsets: ["latin"],
  weight: ["400"],
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
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d){document.documentElement.setAttribute('data-theme','dark');document.getElementById('favicon').href='/favicon-dark.svg'}}catch(e){}})();console.log('%c Hey, you found the console. %c\\n\\nIf you\\'re reading this, we should probably work together.\\nhttps://github.com/30Nomad032000\\n','background:#E63B2E;color:#fff;padding:8px 12px;border-radius:4px;font-size:14px;font-weight:bold;','color:#888;font-size:12px;')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ebin John Joseph",
              url: "https://ebin.pro",
              jobTitle: "Full-Stack Engineer",
              sameAs: [
                "https://github.com/30Nomad032000",
                "https://www.linkedin.com/in/ebin-j/",
              ],
              knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"],
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSerif.variable} ${spaceMono.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>
          <HapticLayer />
          <CommandPalette />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
