import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { PromotionalPopup } from '@/components/ui/promotional-popup';
import { StaticAuthProvider } from '@/lib/auth/auth-context-static';
import { StaticI18nProvider } from '@/lib/i18n/pure-static';
import { getStaticMessages } from '@/lib/i18n/server-messages';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' }
  ];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getStaticMessages(locale);

  return (
    <StaticI18nProvider locale={locale} messages={messages}>
      <StaticAuthProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <PromotionalPopup />
        </div>
      </StaticAuthProvider>
    </StaticI18nProvider>
  );
}
