import type { Metadata } from "next";
import { Hind_Siliguri, Anek_Latin, Cinzel } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  display: "swap",
});

const anekLatin = Anek_Latin({
  variable: "--font-anek-latin",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const { meta } = dictionaries[lang];
  // Share images come from app/opengraph-image.jpg and app/twitter-image.jpg.
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://www.innorabd.com"),
    title: meta.title,
    description: meta.description,
    applicationName: "INNORA BD",
    openGraph: {
      type: "website",
      url: "/",
      siteName: "INNORA BD",
      title: meta.title,
      description: meta.description,
      locale: lang === "bn" ? "bn_BD" : "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLocale();

  return (
    <html lang={lang} className={`${hindSiliguri.variable} ${anekLatin.variable} ${cinzel.variable} antialiased`}>
      <body>
        <LanguageProvider initialLang={lang}>
          {children}
          <Toaster theme="light" position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
