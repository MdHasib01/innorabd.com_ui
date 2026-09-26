import type { Metadata } from "next";
import { Anek_Bangla, Anek_Latin, Cinzel } from "next/font/google";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/server";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const anekBangla = Anek_Bangla({
  variable: "--font-anek-bangla",
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
  const { meta } = dictionaries[await getLocale()];
  return { title: meta.title, description: meta.description };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLocale();

  return (
    <html lang={lang} className={`${anekBangla.variable} ${anekLatin.variable} ${cinzel.variable} antialiased`}>
      <body>
        <LanguageProvider initialLang={lang}>
          {children}
          <Toaster theme="light" position="top-center" richColors />
        </LanguageProvider>
      </body>
    </html>
  );
}
